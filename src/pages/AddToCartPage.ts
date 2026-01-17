import { type Locator, type Page } from '@playwright/test';

export class AddToCartPage {
  private readonly checkOutButton: Locator;

  constructor(page: Page) {
    this.checkOutButton = page.locator('//a[@data-cart-target="checkoutButton"]');
  }
  async click_check_out_button(): Promise<void> {
    const checkOutButton = this.checkOutButton;
    await checkOutButton.waitFor({ state: 'attached' });
    await checkOutButton.waitFor({ state: 'visible' });
    await checkOutButton.click();
  }
}
