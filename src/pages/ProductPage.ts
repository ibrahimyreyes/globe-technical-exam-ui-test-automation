import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  private readonly firstItemProductLink: Locator;

  constructor(page: Page) {
    this.firstItemProductLink = page.locator('//div[@class="product-card-inner"]').first();
  }

  async click_first_product_link(): Promise<void> {
    const firstItemProductLink = this.firstItemProductLink;
    await firstItemProductLink.waitFor({ state: 'attached' });
    await firstItemProductLink.waitFor({ state: 'visible' });
    await firstItemProductLink.click();
  }
}
