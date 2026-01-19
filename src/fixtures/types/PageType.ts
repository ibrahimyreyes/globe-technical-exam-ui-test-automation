import { AccountPage } from '@pages/AccountPage';
import { CartPage } from '@pages/CartPage';
import { PaymentPage } from '@pages/PaymentPage';
import { GlobalPage } from '@pages/common/GlobalPage';
import { HeaderPage } from '@pages/common/HeaderPage';
import { LoginPage } from '@pages/LoginPage';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';
import { ProductPage } from '@pages/ProductPage';
import { OrderConfirmationPage } from '@pages/OrderConfirmationPage';
import { OrderSummaryPanelPage } from '@pages/common/OrderSummaryPanelPage';
import { AddressPage } from '@pages/AddressPage';
import { DeliveryPage } from '@pages/DeliveryPage';

export interface PageFixtures {
  accountPage: AccountPage;
  loginPage: LoginPage;
  headerPage: HeaderPage;
  globalPage: GlobalPage;
  productPage: ProductPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  paymentPage: PaymentPage;
  orderConfirmationPage: OrderConfirmationPage;
  orderSummaryPanelPage: OrderSummaryPanelPage;
  addressPage: AddressPage;
  deliveryPage: DeliveryPage;
}

export interface PageType extends PageFixtures {}
