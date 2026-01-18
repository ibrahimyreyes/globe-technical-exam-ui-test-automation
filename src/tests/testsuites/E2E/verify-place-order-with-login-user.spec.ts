import { test, expect } from 'src/hooks/BaseTest';
import { APPCONFIG } from 'environments/env-prd';
import { CheckOutPage } from '@pages/CheckOutPage';

test.describe('User will signup then proceed the process until place order', { tag: '@E2E' }, () => {
  test('[T44155]', async ({
    accountPage,
    checkOutPage, 
    productDetailsPage, 
    loginPage,
    globalPage,
    productPage,
    headerPage,
    cartPage,
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
      const productQty = await productDetailsPage.get_product_quantity();
      const productPrice = await productDetailsPage.get_price();
      await productDetailsPage.select_first_size_option();
      await productDetailsPage.click_add_to_cart();
      const priceElem = await cartPage.validate_product_total_price(productPrice);
      expect(priceElem).toBeTruthy();
      const nameElem = await cartPage.validate_product_name(productName);
      expect(nameElem).toBeTruthy();
      const qtyElem = await cartPage.validate_product_quantity(productQty);
      expect(qtyElem).toBeTruthy();
    });

  

    await test.step('Fill up address form', async () => {   
      await cartPage.click_check_out_button();
      await checkOutPage.select_country('United States');
      await checkOutPage.enter_first_name(randomFirstName);
      await checkOutPage.enter_last_name(randomLastName);
      await checkOutPage.enter_street_address('123 Main St');
      await checkOutPage.enter_city_address('New York');
      await checkOutPage.enter_zip_code('10001');
      await checkOutPage.click_save_and_continue_button();
      await checkOutPage.select_standard_delivery_option();
      const initialAmount = await checkOutPage.get_sub_total_amount();
      console.log('Initial Amount:', initialAmount);
      const shippingAmount = await checkOutPage.get_total_shipping_amount();
      console.log('Shipping Amount:', shippingAmount);
      // await checkOutPage.select_next_day_delivery_option();
      // await checkOutPage.getInitialAmount();
      // const shippingAmount = await checkOutPage.get_total_shipping_amount();
      // console.log('Shipping Amount:', shippingAmount);
      // const initialAmount = await checkOutPage.get_inital_amount();
      // console.log('Initial Amount:', initialAmount); 
    });
  });
});
