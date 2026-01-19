import { type Locator, type Page } from '@playwright/test';
import { StringUtils } from '@utilities/StringUtils';

export class CheckOutPage {
  private page: Page;
  private stringUtils: StringUtils;
  private readonly countryDropdown: Locator;
  private readonly firstNameTextBox: Locator;
  private readonly lastNameTextBox: Locator;
  private readonly streetAddressTextBox: Locator;
  private readonly saveAndContinueButton: Locator;
  private readonly firstDeliveryOptionRadio: Locator;
  private readonly shippingLabelElem: Locator;
  private readonly subTotalAmountElem: Locator;
  private readonly streetAddressOptions: Locator;
  private readonly cityAddressTextBox: Locator;
  private readonly zipCodeTextBox: Locator;
  private readonly totalAmountElem: Locator;
  private readonly deliveryOptionCheckBoxes: Locator;
  private readonly cardNumberTextBox: Locator;
  private readonly cvvTextBox: Locator;
  private readonly expiryDateTextBox: Locator;
  private readonly payNowButton: Locator;
  private readonly taxAmountElem: Locator;
  private readonly orderNoElem: Locator;
  private readonly orderConfirmationMessageElem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.stringUtils = new StringUtils();
    this.firstNameTextBox = page.locator('//input[@id="order_ship_address_attributes_firstname"]');
    this.lastNameTextBox = page.locator('//input[@id="order_ship_address_attributes_lastname"]');
    this.streetAddressTextBox = page.locator('//input[@id="order_ship_address_attributes_address1"]');
    this.streetAddressOptions = page.locator('//ul[@id="suggestions-box-options"]');
    this.cityAddressTextBox = page.locator('//input[@id="order_ship_address_attributes_city"]');
    this.zipCodeTextBox = page.locator('//input[@id="order_ship_address_attributes_zipcode"]');
    this.saveAndContinueButton = page.locator('//button[contains(@class,"checkout-content-save-continue-button")]');
    this.countryDropdown = page.locator('//select[@id="order_ship_address_attributes_country_id"]');
    this.firstDeliveryOptionRadio = page.locator('//ul[@data-checkout-delivery-target="shippingList"]//input').first();
    this.shippingLabelElem = page.locator('//div[@data-hook="order_summary"]/div[3]/span[2]');
    this.subTotalAmountElem = page.locator('(//div[@data-hook="order_summary"]/div/span)[2]');
    this.taxAmountElem = page.locator('//div[@data-hook="order_summary"]/div[4]/span[2]');
    this.totalAmountElem = page.locator('//div[@data-hook="order_summary"]//span[@id="summary-order-total"]');
    this.deliveryOptionCheckBoxes = page.locator('//ul[@data-checkout-delivery-target="shippingList"]//input');
    this.cardNumberTextBox = page.frameLocator('(//iframe[contains(@name,"privateStripeFrame")])[1]').locator('//input[@id="Field-numberInput"]');
    this.cvvTextBox = page.frameLocator('(//iframe[contains(@name,"privateStripeFrame")])[1]').locator('//input[@id="Field-cvcInput"]');
    this.expiryDateTextBox = page.frameLocator('(//iframe[contains(@name,"privateStripeFrame")])[1]').locator('//input[@id="Field-expiryInput"]');
    this.payNowButton = page.locator('//button[@id="checkout-payment-submit"]');
    this.orderNoElem = page.locator('//div[@id="checkout"]//div[contains(@id,"order_")]//strong');
    this.orderConfirmationMessageElem = page.locator('//div[@id="checkout"]/div[contains(@id,"order_")]/h4');
  }

  // Address page
  async select_country(byValue: string): Promise<void> {
    const countryDropdown = this.countryDropdown;
    await countryDropdown.waitFor({ state: 'attached' });
    await countryDropdown.waitFor({ state: 'visible' });
    await countryDropdown.selectOption({ value: byValue });
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

  async click_save_and_continue_in_billing_address(): Promise<void> {
    const saveAndContinueButton = this.saveAndContinueButton;
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/delivery') && response.status() === 200),
      saveAndContinueButton.click()
    ]);
  }

  // Delivery page
  async select_first_delivery_option(): Promise<void> {
    const firstDeliveryOptionRadio = this.firstDeliveryOptionRadio;
    await firstDeliveryOptionRadio.waitFor({ state: 'attached' });
    await firstDeliveryOptionRadio.waitFor({ state: 'visible' });
    await firstDeliveryOptionRadio.click();
    await this.page.waitForResponse(Response => Response.url().includes('/update/delivery') && Response.status() === 200);
  }

  async get_first_delivery_option_elem(): Promise<Locator> {
    const firstDeliveryOptionRadio = this.firstDeliveryOptionRadio;
    return firstDeliveryOptionRadio;
  }

  async click_save_and_continue_in_delivery(): Promise<void> {
    const saveAndContinueButton = this.saveAndContinueButton;
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/fingerprinted/js/phone-numbers-lib') && response.status() === 200),
      saveAndContinueButton.click()
    ]);
  }

  // Order summary panel
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

  // Get final amount (subtotal + shipping)
  async get_total_cost_with_shipping(shippingCost: string): Promise<string> {
    const subTotalAmountElem = this.subTotalAmountElem;
    await subTotalAmountElem.waitFor({ state: 'attached' });
    await subTotalAmountElem.waitFor({ state: 'visible' });
    const subTotalAmountstr = await this.get_sub_total_amount();
    const totalShippingAmountStr = shippingCost;
    const subTotalAmount = await this.stringUtils.parseCurrencyToNumber(subTotalAmountstr);
    const totalShippingAmount = await this.stringUtils.parseCurrencyToNumber(totalShippingAmountStr);
    return (subTotalAmount + totalShippingAmount).toFixed(2);
  }

  async get_total_amount_text(): Promise<string> {
    const totalAmountElem = this.totalAmountElem;
    await totalAmountElem.waitFor({ state: 'attached' });
    await totalAmountElem.waitFor({ state: 'visible' });
    const totalAmount = await totalAmountElem.textContent();
    return totalAmount?.trim() ?? 'Not found';
  }

  async delivery_option_elems(): Promise<Locator> {
    const deliveryOptionCheckBoxes = this.deliveryOptionCheckBoxes;
    return deliveryOptionCheckBoxes;
  }

  // Payment page
  async enter_card_number(cardNumber: string): Promise<void> {
    const cardNumberTextBox = this.cardNumberTextBox;
    await cardNumberTextBox.waitFor({ state: 'attached' });
    await cardNumberTextBox.waitFor({ state: 'visible' });
    await cardNumberTextBox.fill(cardNumber);
  }

  async enter_expiry_date(expiryDate: string): Promise<void> {
    const expiryDateTextBox = this.expiryDateTextBox;
    await expiryDateTextBox.waitFor({ state: 'attached' });
    await expiryDateTextBox.waitFor({ state: 'visible' });
    await expiryDateTextBox.fill(expiryDate);
  }

  async enter_cvv(cvv: string): Promise<void> {
    const cvvTextBox = this.cvvTextBox;
    await cvvTextBox.waitFor({ state: 'attached' });
    await cvvTextBox.waitFor({ state: 'visible' });
    await cvvTextBox.fill(cvv);
  }

  async click_save_and_continue_in_delivery_option(): Promise<void> {
    const saveAndContinueButton = this.saveAndContinueButton;
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/delivery') && response.status() === 200),
      saveAndContinueButton.click()
    ]);
  }

  // Payment page
  async click_pay_now_button(): Promise<void> {
    const payNowButton = this.payNowButton;
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/confirm') && response.status() === 200),
      payNowButton.click()
    ]);
  }

  async get_tax_amount_text(): Promise<string> {
    const taxAmountElem = this.taxAmountElem;
    await taxAmountElem.waitFor({ state: 'attached' });
    await taxAmountElem.waitFor({ state: 'visible' });
    const taxAmount = await taxAmountElem.textContent();
    return taxAmount?.trim() ?? 'Not found';
  }

  // Get final amount (subtotal + shipping + tax)
  async get_final_amount_cost(deliveryCost: string, taxAmountCost: string): Promise<string> {
    const subTotalAmountElem = this.subTotalAmountElem;
    await subTotalAmountElem.waitFor({ state: 'attached' });
    await subTotalAmountElem.waitFor({ state: 'visible' });
    const subTotalAmountstr = await this.get_sub_total_amount();
    const totalShippingAmountStr = deliveryCost;

    const subTotalAmount = await this.stringUtils.parseCurrencyToNumber(subTotalAmountstr);
    const totalShippingAmount = await this.stringUtils.parseCurrencyToNumber(totalShippingAmountStr);
    const taxAmount = await this.stringUtils.parseCurrencyToNumber(taxAmountCost);
    return (subTotalAmount + totalShippingAmount + taxAmount).toFixed(2);
  }

  // Order confirmation page
  async get_order_no_text(): Promise<string> {
    const orderNoElem = this.orderNoElem;
    await orderNoElem.waitFor({ state: 'attached' });
    await orderNoElem.waitFor({ state: 'visible' });
    const orderNo = await orderNoElem.textContent();
    return orderNo?.trim() ?? 'Not found';
  }

  async get_order_confirmation_message_text(): Promise<string> {
    const orderConfirmationMessageElem = this.orderConfirmationMessageElem;
    await orderConfirmationMessageElem.waitFor({ state: 'attached' });
    await orderConfirmationMessageElem.waitFor({ state: 'visible' });
    const orderConfirmationMessage = await orderConfirmationMessageElem.textContent();
    return orderConfirmationMessage?.trim() ?? 'Not found';
  }
}
