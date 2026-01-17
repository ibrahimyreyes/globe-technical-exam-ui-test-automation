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
    addToCartPage,
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
      const pageTitle = await page.title();
      expect(pageTitle).toBe('Spree Commerce DEMO');
    });

    await test.step('Sign up', async () => {    
      await headerPage.click_account_icon_link();
      await loginPage.click_sign_up();
      await loginPage.enter_username(randomEmail);
      await loginPage.enter_password("pwD12345!");
      await loginPage.enter_confirm_password("pwD12345!");
      await loginPage.click_sign_in();
      const element = globalPage.flash_message_notification_elem;
      expect(element).toBeTruthy();
    });

    await test.step('Add product to cart', async () => {    
      await headerPage.click_shop_all_link();
      await productPage.click_first_product_link(); //temporary fix. need to select product from data driven?
      const productName = await productDetailsPage.get_product_name();
      console.log('Product Name:', productName);
      const productQty = await productDetailsPage.get_product_quantity();
      console.log('Product Quantity:', productQty);
      const productPrice = await productDetailsPage.get_price();
      console.log('Product Price:', productPrice);
      await productDetailsPage.select_first_size_option();
      await productDetailsPage.click_add_to_cart();
      const priceElem = await addToCartPage.validate_product_total_price(productPrice);
      expect(priceElem).toBeTruthy();
      const nameElem = await addToCartPage.validate_product_name(productName);
      expect(nameElem).toBeTruthy();
      const qtyElem = await addToCartPage.validate_product_quantity(productQty);
      expect(qtyElem).toBeTruthy();
    });

    await test.step('Check out', async () => {   

    });
  });
});
