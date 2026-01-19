import { AccountPage } from '@pages/AccountPage';
import { CartPage } from '@pages/CartPage';
import { CheckOutPage } from '@pages/CheckOutPage';
import { GlobalPage } from '@pages/common/GlobalPage';
import { HeaderPage } from '@pages/HeaderPage';
import { LoginPage } from '@pages/LoginPage';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';
import { ProductPage } from '@pages/ProductPage';

export interface PageFixtures {
  accountPage: AccountPage;
  loginPage: LoginPage;
  headerPage: HeaderPage;
  globalPage: GlobalPage;
  productPage: ProductPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkOutPage: CheckOutPage;
}

export interface PageType extends PageFixtures {}
