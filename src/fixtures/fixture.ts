import { AccountPage } from '@pages/AccountPage';
import { CartPage } from '@pages/CartPage';
import { CheckOutPage } from '@pages/CheckOutPage';
import { GlobalPage } from '@pages/common/GlobalPage';
import { HeaderPage } from '@pages/HeaderPage';
import { LoginPage } from '@pages/LoginPage';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';
import { ProductPage } from '@pages/ProductPage';
import { test as base, mergeTests } from '@playwright/test';
import { HelperType } from 'src/fixtures/types/HelperType';
import { PageType } from 'src/fixtures/types/PageType';

import { RandomDataGenerator } from 'src/helpers/random-data-generator/RandomDataGenerator';
import { ActionUtils } from 'src/utilities/ActionUtils';
import { TestDataReader } from 'src/utilities/reader-utils/JsonReader';

// fixtures for page objects

const pageFixtures = base.extend<PageType>({
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
  globalPage: async ({ page }, use) => {
    await use(new GlobalPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkOutPage: async ({ page }, use) => {
    await use(new CheckOutPage(page));
  }
});

export const actionUtilsFixtures = base.extend<HelperType>({
  actionUtils: async ({ page }, use) => {
    const actionUtils = new ActionUtils(page);
    await use(actionUtils);
  }
});

// fixtures for test data
export const testDataFixtures = base.extend<HelperType>({
  randomDataGenerator: async ({}, use) => {
    const dataGenerator = new RandomDataGenerator();
    await use(dataGenerator);
  },
  jsonReader: async ({}, use) => {
    const jsonReader = new TestDataReader();
    await use(jsonReader);
  }
});

export const test = mergeTests(pageFixtures, testDataFixtures, actionUtilsFixtures);
