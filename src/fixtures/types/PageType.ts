import { AccountPage } from '@pages/AccountPage';
import { LoginPage } from '@pages/LoginPage';
import { HeaderPage } from '@pages/HeaderPage';
import { GlobalPage } from '@pages/common/GlobalPage';
import { ProductPage } from '@pages/ProductPage';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';
import { AddToCartPage } from '@pages/AddToCartPage';

export interface PageFixtures {
  accountPage: AccountPage;
  loginPage: LoginPage;
  headerPage: HeaderPage;
  globalPage: GlobalPage;
  productPage: ProductPage;
  productDetailsPage: ProductDetailsPage;  
  addToCartPage: AddToCartPage;
} 

export interface PageType extends PageFixtures {}
