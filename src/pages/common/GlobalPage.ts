import { type Locator, type Page } from '@playwright/test';

export class GlobalPage {
  private readonly flashMessageElem: Locator;

  constructor(page: Page) {
    this.flashMessageElem = page.locator('//p[contains(@class, "flash-message")]');
  }

  async flash_message_notification_elem(): Promise<Locator> {
    const flashMessageElem = this.flashMessageElem;
    return flashMessageElem;
  }
}
