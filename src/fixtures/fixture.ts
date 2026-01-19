import { AccountPage } from '@pages/AccountPage';
import { AddressPage } from '@pages/AddressPage';
import { CartPage } from '@pages/CartPage';
import { GlobalPage } from '@pages/common/GlobalPage';
import { OrderSummaryPanelPage } from '@pages/common/OrderSummaryPanelPage';
import { DeliveryPage } from '@pages/DeliveryPage';
import { HeaderPage } from '@pages/common/HeaderPage';
import { LoginPage } from '@pages/LoginPage';
import { OrderConfirmationPage } from '@pages/OrderConfirmationPage';
import { PaymentPage } from '@pages/PaymentPage';
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
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  orderConfirmationPage: async ({ page }, use) => {
    await use(new OrderConfirmationPage(page));
  },
  orderSummaryPanelPage: async ({ page }, use) => {
    await use(new OrderSummaryPanelPage(page));
  },
  addressPage: async ({ page }, use) => {
    await use(new AddressPage(page));
  },
  deliveryPage: async ({ page }, use) => {
    await use(new DeliveryPage(page));
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
