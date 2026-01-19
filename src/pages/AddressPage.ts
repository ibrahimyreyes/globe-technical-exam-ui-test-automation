import { type Locator, type Page } from '@playwright/test';

export class AddressPage {
  private page: Page;
  private readonly countryDropdown: Locator;
  private readonly firstNameTextBox: Locator;
  private readonly lastNameTextBox: Locator;
  private readonly streetAddressTextBox: Locator;
  private readonly streetAddressOptions: Locator;
  private readonly cityAddressTextBox: Locator;
  private readonly zipCodeTextBox: Locator;
  public readonly saveAndContinueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameTextBox = page.locator('//input[@id="order_ship_address_attributes_firstname"]');
    this.lastNameTextBox = page.locator('//input[@id="order_ship_address_attributes_lastname"]');
    this.streetAddressTextBox = page.locator('//input[@id="order_ship_address_attributes_address1"]');
    this.streetAddressOptions = page.locator('//ul[@id="suggestions-box-options"]');
    this.cityAddressTextBox = page.locator('//input[@id="order_ship_address_attributes_city"]');
    this.zipCodeTextBox = page.locator('//input[@id="order_ship_address_attributes_zipcode"]');
    this.countryDropdown = page.locator('//select[@id="order_ship_address_attributes_country_id"]');
    this.saveAndContinueButton = page.locator('//button[contains(@class,"checkout-content-save-continue-button")]');
  }

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
    await saveAndContinueButton.waitFor({ state: 'attached' });
    await saveAndContinueButton.waitFor({ state: 'visible' });
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/delivery') && response.status() === 200),
      saveAndContinueButton.click()
    ]);
  }
}
