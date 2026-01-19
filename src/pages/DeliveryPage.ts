import { type Locator, type Page } from '@playwright/test';
import { AddressPage } from './AddressPage';

export class DeliveryPage {
  private page: Page;
  private readonly firstDeliveryOptionRadio: Locator;
  addressPage: AddressPage;

  constructor(page: Page) {
    this.page = page;
    this.firstDeliveryOptionRadio = page.locator('//ul[@data-checkout-delivery-target="shippingList"]//input').first();
    this.addressPage = new AddressPage(page);
  }

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
    const saveAndContinueButton = this.addressPage.saveAndContinueButton;
    await saveAndContinueButton.waitFor({ state: 'attached' });
    await saveAndContinueButton.waitFor({ state: 'visible' });
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/fingerprinted/js/phone-numbers-lib') && response.status() === 200),
      saveAndContinueButton.click()
    ]);
  }
}
