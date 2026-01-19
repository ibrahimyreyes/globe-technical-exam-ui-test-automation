import { type Locator, type Page } from '@playwright/test';
import { StringUtils } from '@utilities/StringUtils';

export class OrderSummaryPanelPage {
  private stringUtils: StringUtils;
  private readonly totalAmountElem: Locator;
  private readonly deliveryOptionCheckBoxes: Locator;
  private readonly shippingLabelElem: Locator;
  private readonly subTotalAmountElem: Locator;

  constructor(page: Page) {
    this.stringUtils = new StringUtils();
    this.totalAmountElem = page.locator('//div[@data-hook="order_summary"]//span[@id="summary-order-total"]');
    this.deliveryOptionCheckBoxes = page.locator('//ul[@data-checkout-delivery-target="shippingList"]//input');
    this.shippingLabelElem = page.locator('//div[@data-hook="order_summary"]/div[3]/span[2]');
    this.subTotalAmountElem = page.locator('(//div[@data-hook="order_summary"]/div/span)[2]');
  }

  async get_sub_total_amount(): Promise<string> {
    const subTotalAmountElem = this.subTotalAmountElem;
    await subTotalAmountElem.waitFor({ state: 'attached' });
    await subTotalAmountElem.waitFor({ state: 'visible' });
    const subTotalAmount = await subTotalAmountElem.textContent();
    return subTotalAmount?.trim() ?? 'Not found';
  }

  async get_total_shipping_amount(): Promise<string> {
    const shippingLabelElem = this.shippingLabelElem;
    await shippingLabelElem.waitFor({ state: 'attached' });
    await shippingLabelElem.waitFor({ state: 'visible' });
    const shippingAmount = await shippingLabelElem.textContent();
    return shippingAmount?.trim() ?? 'Not found';
  }

  // Get final amount (subtotal + shipping)
  async get_total_cost_with_shipping(shippingCost: string): Promise<string> {
    const subTotalAmountElem = this.subTotalAmountElem;
    await subTotalAmountElem.waitFor({ state: 'attached' });
    await subTotalAmountElem.waitFor({ state: 'visible' });
    const subTotalAmountstr = await this.get_sub_total_amount();
    const totalShippingAmountStr = shippingCost;
    const subTotalAmount = await this.stringUtils.parseCurrencyToNumber(subTotalAmountstr);
    const totalShippingAmount = await this.stringUtils.parseCurrencyToNumber(totalShippingAmountStr);
    return (subTotalAmount + totalShippingAmount).toFixed(2);
  }

  async get_total_amount_text(): Promise<string> {
    const totalAmountElem = this.totalAmountElem;
    await totalAmountElem.waitFor({ state: 'attached' });
    await totalAmountElem.waitFor({ state: 'visible' });
    const totalAmount = await totalAmountElem.textContent();
    return totalAmount?.trim() ?? 'Not found';
  }

  async delivery_option_elems(): Promise<Locator> {
    const deliveryOptionCheckBoxes = this.deliveryOptionCheckBoxes;
    return deliveryOptionCheckBoxes;
  }

  // Get final amount (subtotal + shipping + tax)
  async get_final_amount_cost(deliveryCost: string, taxAmountCost: string): Promise<string> {
    const subTotalAmountElem = this.subTotalAmountElem;
    await subTotalAmountElem.waitFor({ state: 'attached' });
    await subTotalAmountElem.waitFor({ state: 'visible' });
    const subTotalAmountstr = await this.get_sub_total_amount();
    const totalShippingAmountStr = deliveryCost;

    const subTotalAmount = await this.stringUtils.parseCurrencyToNumber(subTotalAmountstr);
    const totalShippingAmount = await this.stringUtils.parseCurrencyToNumber(totalShippingAmountStr);
    const taxAmount = await this.stringUtils.parseCurrencyToNumber(taxAmountCost);
    return (subTotalAmount + totalShippingAmount + taxAmount).toFixed(2);
  }
}
