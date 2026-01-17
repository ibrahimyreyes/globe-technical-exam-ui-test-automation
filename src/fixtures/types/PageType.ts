import { AccountPage } from '@pages/AccountPage';
import { LoginPage } from '@pages/LoginPage';
import { HeaderPage } from '@pages/HeaderPage';

export interface PageFixtures {
  accountPage: AccountPage;
  loginPage: LoginPage;
  headerPage: HeaderPage;
} 

export interface PageType extends PageFixtures {}
