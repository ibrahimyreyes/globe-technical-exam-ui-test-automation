import { APPCONFIG } from 'environments/env-prd';
import { test, expect } from 'src/hooks/BaseTest';

test.describe('E2E scenario for placing an order with a logged-in user', { tag: '@E2E' }, () => {
  test('[T44155]', async ({
    checkOutPage,
    productDetailsPage,
    loginPage,
    globalPage,
    productPage,
    headerPage,
    cartPage,
    actionUtils,
    randomDataGenerator,
    page
  }) => {
    const randomFirstName = await randomDataGenerator.generateRandomFirstName();
    const randomLastName = await randomDataGenerator.generateTimestamp();
    const randomEmail = randomFirstName + randomLastName + '@example.com';
    let shippingFee: string;

    await test.step('Navigate to application', async () => {
      await actionUtils.navigateTo(APPCONFIG.Prd.SpreeCommerce.App.URL);
      const pageTitle = await page.title();
      expect(pageTitle).toBe('Spree Commerce DEMO');
    });

    await test.step('Sign up', async () => {
      await headerPage.click_account_icon_link();
      await loginPage.click_sign_up();
      await loginPage.enter_username(randomEmail);
      await loginPage.enter_password('pwD12345!');
      await loginPage.enter_confirm_password('pwD12345!');
      await loginPage.click_sign_in();
      const element = globalPage.flash_message_notification_elem;
      expect(element).toBeTruthy();
    });
    // Red Polo Shirt stable data
    await test.step('Add product to cart', async () => {
      await headerPage.click_shop_all_link();
      await productPage.click_first_product_link();// Temporary hardcoded to the first product
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

    await test.step('Fill up address form then proceed delivery page', async () => {
      await cartPage.click_check_out_button();
      await checkOutPage.select_country('2411'); // United States
      await checkOutPage.enter_first_name(randomFirstName);
      await checkOutPage.enter_last_name(randomLastName);
      await checkOutPage.enter_street_address('123 Main St');
      await checkOutPage.enter_city_address('New York');
      await checkOutPage.enter_zip_code('10001');
      await checkOutPage.click_save_and_continue_in_billing_address();
    });

    await test.step('Verify delivery options and costs', async () => {
      // validate each delivery option and its cost reflected in total amount
      const deliveryOptionElems = await checkOutPage.delivery_option_elems();
      const count = await deliveryOptionElems.count();
      for (let i = 0; i < count; i++) { //will separate function here later for cleaner code
        const element = deliveryOptionElems.nth(i);
        const deliveryCost = await element.getAttribute('data-cost') || 'Not Found';
        await Promise.all([ 
          element.click(),
          page.waitForResponse(response => response.url().includes('/update/delivery') && response.status() === 200)
        ]);
        const totalAmount = await checkOutPage.get_total_amount_text();
        const finalAmountAfterShippingCost = await checkOutPage.get_total_cost_with_shipping(deliveryCost);
        expect(totalAmount).toContain(finalAmountAfterShippingCost);
      }
      await checkOutPage.select_first_delivery_option();
      const firstDeliveryOptionElem = await checkOutPage.get_first_delivery_option_elem();
      // storing shipping fee for final validation of total amount after tax
      const firstIndexShippingFee = await firstDeliveryOptionElem.getAttribute('data-cost') || 'Not Found';
      shippingFee = firstIndexShippingFee;
      await checkOutPage.click_save_and_continue_in_delivery();
    });

    await test.step('Fill up payment form', async () => {
      await checkOutPage.enter_card_number('4242424242424242');
      await checkOutPage.enter_expiry_date('12/34');
      await checkOutPage.enter_cvv('123');
      await checkOutPage.click_pay_now_button();
    });

    await test.step('Place order', async () => {
      const orderNo = await checkOutPage.get_order_no_text();
      const orderConfirmationMessage = await checkOutPage.get_order_confirmation_message_text();
      expect(orderNo).toHaveLength(10);
      expect(orderConfirmationMessage).toContain(randomFirstName);

      const taxAmount = await checkOutPage.get_tax_amount_text();
      const totalAmount = await checkOutPage.get_total_amount_text();
      const finalAmountAfterTax = await checkOutPage.get_final_amount_cost(shippingFee, taxAmount);
      expect(totalAmount).toContain(finalAmountAfterTax);
    });
  });
});
