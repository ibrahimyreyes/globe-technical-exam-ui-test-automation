import { type Page } from 'playwright';

export class ActionUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Add common action utility methods here that can be reused across different page classes
  // For example, methods for clicking, typing, waiting for elements, etc.
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
