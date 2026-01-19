import { type Locator, type Page } from '@playwright/test';

export class HeaderPage {
  private page: Page;
  private readonly shopAllLink: Locator;
  private readonly accountIconLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shopAllLink = page.locator('//div[@class="header--nav-item group"]//a[@data-title="shop all"]');
    this.accountIconLink = page.locator('//button[@aria-label="Open account panel"]');
  }

  async click_shop_all_link(): Promise<void> {
    const shopAllLink = this.shopAllLink;
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/settings') && response.status() === 200),
      await shopAllLink.click()
    ]);
  }

  async click_account_icon_link(): Promise<void> {
    const accountIconLink = this.accountIconLink;
    await accountIconLink.click();
  }
}
