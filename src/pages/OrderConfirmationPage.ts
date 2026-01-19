import { type Locator, type Page } from '@playwright/test';

export class OrderConfirmationPage {
  private readonly orderNoElem: Locator;
  private readonly orderConfirmationMessageElem: Locator;

  constructor(page: Page) {
    this.orderNoElem = page.locator('//div[@id="checkout"]//div[contains(@id,"order_")]//strong');
    this.orderConfirmationMessageElem = page.locator('//div[@id="checkout"]/div[contains(@id,"order_")]/h4');
  }

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
