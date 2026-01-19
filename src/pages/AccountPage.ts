import { type Locator, type Page } from '@playwright/test';

export class AccountPage {
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.logoutButton = page.locator('//form[@action="/user/sign_out"]');
  }

  // dont forget to add the assertion after signing up

  async click_logout(): Promise<void> {
    const logoutButton = this.logoutButton;
    await logoutButton.click();
  }
}
