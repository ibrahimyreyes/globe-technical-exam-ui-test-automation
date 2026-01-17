import { test, expect } from 'src/hooks/BaseTest';
import { APPCONFIG } from 'environments/env-prd';

test.describe('User will signup then proceed the process until place order', { tag: '@E2E' }, () => {
  test('[T44155]', async ({
    accountPage, 
    productDetailsPage, 
    loginPage,
    globalPage,
    productPage,
    headerPage,
    actionUtils,
    jsonReader,
    randomDataGenerator,
    page
  }) => {
    const employeesData = jsonReader.getSection('employee', 'employee', 'employee');
    const randomFirstName = await randomDataGenerator.generateRandomFirstName();
    const randomLastName = await randomDataGenerator.generateRandomLastNameWithUUID();
    const randomEmail = randomFirstName + randomLastName + '@example.com';
    const randomAge = await randomDataGenerator.generateRandomAge();
    const randomSalary = await randomDataGenerator.generateRandomSalary();
    const randomDepartment = await randomDataGenerator.generateRandomDepartment();

    await test.step('Navigate to application', async () => {
      await actionUtils.navigateTo(APPCONFIG.Prd.Demoqa.App.URL);
    });

    await test.step('Sign up', async () => {    
      await headerPage.click_account_icon_link();
      await loginPage.click_sign_up();
      await loginPage.enter_username(randomEmail);
      await loginPage.enter_password("pwD12345!");
      await loginPage.enter_confirm_password("pwD12345!");
      await loginPage.click_sign_in();
      // assert sign up successful
      await headerPage.click_shop_all_link();
      await productPage.click_first_product_link(); //temporary fix. need to select product for data driven
      const productPrice = await productDetailsPage.get_price();
      console.log('Product Price:', productPrice);
      await productDetailsPage.select_first_size_option();
      await productDetailsPage.click_add_to_cart();
    });
  });
});
