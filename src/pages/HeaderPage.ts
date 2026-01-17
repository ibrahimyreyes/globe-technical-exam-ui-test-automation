import { type Locator, type Page } from '@playwright/test';

export class HeaderPage {
  private readonly shopAllLink: Locator;
  private readonly accountIconLink: Locator;

  constructor(page: Page) {
    this.shopAllLink = page.locator('//a[@data-title="shop all"]');
    this.accountIconLink = page.locator('//button[@aria-label="Open account panel"]');
  }

  async click_shop_all_link(): Promise<void> {
    const shopAllLink = this.shopAllLink;
    await shopAllLink.click();
  }

  async click_account_icon_link(): Promise<void> {
    const accountIconLink = this.accountIconLink;
    await accountIconLink.click();
  }
}
