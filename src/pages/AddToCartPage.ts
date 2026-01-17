import { type Locator, type Page } from '@playwright/test';

export class AddToCartPage {
  private page: Page;
  private readonly checkOutButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.checkOutButton = page.locator('//a[@data-cart-target="checkoutButton"]');
   
  }
  async click_check_out_button(): Promise<void> {
    const checkOutButton = this.checkOutButton;
    await checkOutButton.waitFor({ state: 'attached' });
    await checkOutButton.waitFor({ state: 'visible' });
    await checkOutButton.click();
  }

  async validate_product_name(expectedProductName: string): Promise<boolean> {
    const productLabelInCart =  this.page.locator(`//a[contains(text(),"${expectedProductName}")]`);
    await productLabelInCart.waitFor({ state: 'attached' });
    await productLabelInCart.waitFor({ state: 'visible' });
    return await productLabelInCart.isVisible();
  }

  async validate_product_total_price(expectedPrice: string): Promise<boolean> {
    const productPriceInCart =  this.page.locator(`//turbo-frame[@id="cart_summary"]//span[contains(text(),"${expectedPrice}")]`).first();
    await productPriceInCart.waitFor({ state: 'attached' });
    await productPriceInCart.waitFor({ state: 'visible' });
    return await productPriceInCart.isVisible();
  }

  async validate_product_quantity(expectedQuantity: number): Promise<boolean> { 
    const productQtyInCart =  this.page.locator(`//input[@aria-label="Quantity"][@value="${expectedQuantity}"]`).first();
    await productQtyInCart.waitFor({ state: 'attached' });
    await productQtyInCart.waitFor({ state: 'visible' });
    return await productQtyInCart.isVisible();
  }


}
