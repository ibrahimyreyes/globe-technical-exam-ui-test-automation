import { type Locator, type Page } from '@playwright/test';

export class CheckOutPage {
  private page: Page;
  private readonly countryDropdown: Locator;
  private readonly firstNameTextBox: Locator;
  private readonly lastNameTextBox: Locator;
  private readonly streetAddressTextBox: Locator;
  private readonly saveAndContinueButton: Locator;
  private readonly standardDeliveryOptionRadio: Locator;
  private readonly premiumDeliveryOptionRadio: Locator;
  private readonly nextDayDeliveryOptionRadio: Locator;
  private readonly shippingLabelElem: Locator;
  private readonly subTotalAmountElem: Locator;
  private readonly streetAddressOptions: Locator;
  private readonly cityAddressTextBox: Locator;
  private readonly zipCodeTextBox: Locator;
  private readonly totalAmountElem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameTextBox = page.locator('//input[@id="order_ship_address_attributes_firstname"]');
    this.lastNameTextBox = page.locator('//input[@id="order_ship_address_attributes_lastname"]');
    this.streetAddressTextBox = page.locator('//input[@id="order_ship_address_attributes_address1"]');
    this.streetAddressOptions = page.locator('//ul[@id="suggestions-box-options"]');
    this.cityAddressTextBox = page.locator('//input[@id="order_ship_address_attributes_city"]')
    this.zipCodeTextBox = page.locator('//input[@id="order_ship_address_attributes_zipcode"]');
    this.saveAndContinueButton = page.locator('//button[contains(@class,"checkout-content-save-continue-button")]'); 
    this.countryDropdown = page.locator('//select[@id="order_ship_address_attributes_country_id"]');
    this.standardDeliveryOptionRadio = page.locator('(//li[@data-checkout-delivery-target="shippingRate"])[1]');
    this.premiumDeliveryOptionRadio = page.locator('(//li[@data-checkout-delivery-target="shippingRate"])[2]');
    this.nextDayDeliveryOptionRadio = page.locator('(//li[@data-checkout-delivery-target="shippingRate"])[3]');
    this.shippingLabelElem = page.locator('//div[@data-hook="order_summary"]/div[3]/span[2]');
     //*[@id="checkout_summary"]/div/div[1]/div[3]/span[2]
    this.subTotalAmountElem = page.locator('(//div[@data-hook="order_summary"]/div/span)[2]');
    this.totalAmountElem = page.locator('//div[@data-hook="order_summary"]//span[@id="summary-order-total"]');
  }
  //Address page
  async select_country(countryName: string): Promise<void> {
    const countryDropdown = this.countryDropdown;
    await countryDropdown.selectOption(countryName);
  }
  async enter_first_name(firstName: string): Promise<void> {
    const firstNameField = this.firstNameTextBox;
    await firstNameField.fill(firstName);
  }
  async enter_last_name(lastName: string): Promise<void> {
    const lastNameField = this.lastNameTextBox;
    await lastNameField.fill(lastName);
  }
  async enter_street_address(streetAddress: string): Promise<void> {
    const streetAddressField = this.streetAddressTextBox;
    const streetAddressOptions = this.streetAddressOptions;
    await streetAddressField.click();
    await streetAddressField.fill(streetAddress);
    await streetAddressField.click();
    await streetAddressOptions.waitFor({ state: 'visible' });
    await streetAddressField.press('Tab');
    await streetAddressOptions.waitFor({ state: 'hidden' });
  }

  async enter_city_address(cityAddress: string): Promise<void> {
    const cityAddressField = this.cityAddressTextBox;
    await cityAddressField.fill(cityAddress);
  }

  async enter_zip_code(zipCode: string): Promise<void> {   
    const zipCodeField = this.zipCodeTextBox;
    await zipCodeField.fill(zipCode);
  }

  async click_save_and_continue_button(): Promise<void> {
    const saveAndContinueButton = this.saveAndContinueButton;
    await saveAndContinueButton.click();
  }
  //Delivery page
  async select_standard_delivery_option(): Promise<void> {
    const standardDeliveryOptionRadio = this.standardDeliveryOptionRadio;
    await standardDeliveryOptionRadio.waitFor({state:"attached"});
    await standardDeliveryOptionRadio.waitFor({state:"visible"});
    await standardDeliveryOptionRadio.click();
    await this.page.waitForResponse(Response=> Response.url().includes('/update/delivery') && Response.status() === 200);
  }
  async select_premium_delivery_option(): Promise<void> {
    const premiumDeliveryOptionRadio = this.premiumDeliveryOptionRadio;
    await premiumDeliveryOptionRadio.waitFor({state:"attached"});
    await premiumDeliveryOptionRadio.waitFor({state:"visible"});
    await premiumDeliveryOptionRadio.click();
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/update/delivery') && response.status() === 200),
      await premiumDeliveryOptionRadio.click()
    ]);
   
  }
  async select_next_day_delivery_option(): Promise<void> {
    const nextDayDeliveryOptionRadio = this.nextDayDeliveryOptionRadio;
    await nextDayDeliveryOptionRadio.waitFor({state:"attached"});
    await nextDayDeliveryOptionRadio.waitFor({state:"visible"});
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/update/delivery') && response.status() === 200),
      await nextDayDeliveryOptionRadio.click()
    ]);
  }
  //Order summary panel
  async get_sub_total_amount(): Promise<string> {
    const subTotalAmountElem = this.subTotalAmountElem;
    await subTotalAmountElem.waitFor({ state: 'attached' });
    await subTotalAmountElem.waitFor({ state: 'visible' });
    const subTotalAmount = await subTotalAmountElem.textContent();
    return subTotalAmount?.trim() ?? 'Not found';
  }

  async get_total_shipping_amount(): Promise<string> {
    const shippingLabelElem = this.shippingLabelElem;
    await shippingLabelElem.waitFor({ state: 'attached' });
    await shippingLabelElem.waitFor({ state: 'visible' });
    const shippingAmount = await shippingLabelElem.textContent();
    return shippingAmount?.trim() ?? 'Not found';
  }

  async get_final_amount(): Promise<string> {
    const subTotalAmountElem = this.subTotalAmountElem;
    await subTotalAmountElem.waitFor({ state: 'attached' });
    await subTotalAmountElem.waitFor({ state: 'visible' });
    const initialAmount = await subTotalAmountElem.textContent();
    const totalShippingAmount = await this.get_total_shipping_amount();
    if (typeof totalShippingAmount === 'number') {
      return (parseFloat(initialAmount ?? '0') + totalShippingAmount).toString();
    }
    return initialAmount?.trim() ?? 'Not found';
  }

  async get_total_amount_elem(): Promise<String> {
    const totalAmountElem = this.totalAmountElem; 
    await totalAmountElem.waitFor({ state: 'attached' });
    await totalAmountElem.waitFor({ state: 'visible' });
    const totalAmount = await totalAmountElem.textContent();
    return totalAmount?.trim() ?? 'Not found';  
  }
}