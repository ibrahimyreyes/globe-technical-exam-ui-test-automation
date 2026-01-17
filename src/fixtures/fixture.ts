import { test as base, mergeTests } from '@playwright/test';
import { PageType } from 'src/fixtures/types/PageType';
import { HelperType } from 'src/fixtures/types/HelperType';

import { RandomDataGenerator } from 'src/helpers/random-data-generator/RandomDataGenerator';
import { TestDataReader } from 'src/utilities/reader-utils/JsonReader';
import { ActionUtils } from 'src/utilities/ActionUtils';

import { AccountPage } from '@pages/AccountPage';
import { HeaderPage } from '@pages/HeaderPage';
import { LoginPage } from '@pages/LoginPage';

const pageFixtures = base.extend<PageType>({
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
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
