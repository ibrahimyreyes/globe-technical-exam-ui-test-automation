import { type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
  private page: Page;
  private readonly addToCardButton: Locator;
  private readonly sizeDropdown: Locator;
  private readonly firstSizeOption: Locator;
  private readonly discountedPriceLabel: Locator;
  private readonly regualrPriceLabel: Locator;
  private readonly productNameLabel: Locator;
  private readonly productQty: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCardButton = page.locator('//div[@data-editor-name="Add To Cart"]').first();
    this.sizeDropdown = page.locator('//div[@data-controller="dropdown"][@aria-label="Size"]//button');
    this.firstSizeOption = this.page.locator(`//div[@data-controller="dropdown"][@aria-label="Size"]//label`).first();
    this.discountedPriceLabel = page.locator('//div[@data-product-form-target="productDetails"]//p[contains(@class, "inline text-danger")]');
    this.regualrPriceLabel = page.locator('//div[@data-product-form-target="productDetails"]//span[@class="hidden"]/following-sibling::p').first();  
    this.productNameLabel = page.locator('//div[@data-product-form-target="productDetails"]/div[@data-editor-name="Brand"]/parent::div[@data-product-form-target="productDetails"]//h1');
    this.productQty = page.locator('//div[@data-product-form-target="productDetails"]/div[@data-editor-name="Quantity Selector"]//input[@value]');
  }

  async click_add_to_cart(): Promise<void> {
    const addToCardButton = this.addToCardButton;
    await addToCardButton.click();
  }

  async select_first_size_option(): Promise<void> { 
    const sizeDropdown = this.sizeDropdown;
    const firstSizeOption = this.firstSizeOption;
    await sizeDropdown.click();
    await firstSizeOption.waitFor({ state: 'attached' });
    await firstSizeOption.waitFor({ state: 'visible' });
    await firstSizeOption.click(); 
  }

  async get_price(): Promise<string> {
    const discountedPriceLabel = this.discountedPriceLabel;
    const regularPriceLabel = this.regualrPriceLabel; 
    const discountedPricePriceExists = await discountedPriceLabel.isVisible();
    const regularPriceExists = await regularPriceLabel.isVisible();

    if (discountedPricePriceExists && regularPriceExists) {
      await discountedPriceLabel.waitFor({ state: 'visible' });
      await regularPriceLabel.waitFor({ state: 'visible' });
      const price = await discountedPriceLabel.textContent() || 'no value';
      return price.trim();
    } else {
      await regularPriceLabel.waitFor({ state: 'visible' });
      await regularPriceLabel.waitFor({ state: 'attached' });
      const regularPrice = await regularPriceLabel.textContent() || 'no value';
      return regularPrice.trim();
    }
  }

  async get_product_name(): Promise<string> {
    const productNameLabel = this.productNameLabel;
    await productNameLabel.waitFor({ state: 'visible' });
    const productName = await productNameLabel.textContent() || 'no value';
    return productName.trim();
  }

  async get_product_quantity(): Promise<number> {
    const productQty = this.productQty;
    await productQty.waitFor({ state: 'visible' });
    const qtyValue = await productQty.getAttribute('value') || '0';
    return parseInt(qtyValue, 10);
  }
}
