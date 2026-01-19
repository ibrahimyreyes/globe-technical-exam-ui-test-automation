import { BrowserContext, Page, expect } from '@playwright/test';
import { test as baseTest } from 'src/fixtures/fixture';

type HookFixture = {
  context: BrowserContext;
  page: Page;
};

export const test = baseTest.extend<HookFixture>({
  context: async ({ browser }, use) => {
    // This code runs before all tests
    const context = await browser.newContext();
    await use(context);
    // This code runs after all tests
    await context.close();
  },

  page: async ({ context }, use) => {
    // This code runs before each test
    test.setTimeout(0);// No set timeout for each test
    const page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1032 });
    page.setDefaultTimeout(60000); // Set timeout for action (60 seconds)
    page.setDefaultNavigationTimeout(60000); // Set timeout for navigating the page (60 seconds)
    await page.waitForLoadState('networkidle');
    await use(page);
    // This code runs after each test
    await page.close();
  }
});

export { expect };
