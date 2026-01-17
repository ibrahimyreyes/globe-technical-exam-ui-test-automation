import { test, expect } from 'src/hooks/BaseTest';
import { APPCONFIG } from 'environments/env-prd';

test.describe('User will signup then proceed the process until place order', { tag: '@E2E' }, () => {
  test('[T44155]', async ({
    accountPage,  
    loginPage,
    headerPage,
    actionUtils,
    jsonReader,
    randomDataGenerator
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
      await loginPage.enter_username("racket@gmail.com");
      await loginPage.enter_password("pwD12345!");
      await loginPage.enter_confirm_password("pwD12345!");
      await loginPage.click_sign_in();
      
    });
  });
});
