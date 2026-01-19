import { type Locator, type Page } from '@playwright/test';

export class PaymentPage {
  private page: Page;
  private readonly cardNumberTextBox: Locator;
  private readonly cvvTextBox: Locator;
  private readonly expiryDateTextBox: Locator;
  private readonly payNowButton: Locator;
  private readonly taxAmountElem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.taxAmountElem = page.locator('//div[@data-hook="order_summary"]/div[4]/span[2]');
    this.cardNumberTextBox = page.frameLocator('(//iframe[contains(@name,"privateStripeFrame")])[1]').locator('//input[@id="Field-numberInput"]');
    this.cvvTextBox = page.frameLocator('(//iframe[contains(@name,"privateStripeFrame")])[1]').locator('//input[@id="Field-cvcInput"]');
    this.expiryDateTextBox = page.frameLocator('(//iframe[contains(@name,"privateStripeFrame")])[1]').locator('//input[@id="Field-expiryInput"]');
    this.payNowButton = page.locator('//button[@id="checkout-payment-submit"]');
  }

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
}
