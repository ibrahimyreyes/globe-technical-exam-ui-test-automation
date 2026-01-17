import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameTextBox: Locator;
  private readonly passwordTextBox: Locator;
  private readonly confirmPasswordTextBox: Locator;
  private readonly signInButton: Locator;
  private readonly logInButton: Locator;
  private readonly signUpButton: Locator;

  constructor(page: Page) {
    this.usernameTextBox = page.locator('//input[@id="user_email"]');
    this.passwordTextBox = page.locator('//input[@id="user_password"]');
    this.confirmPasswordTextBox = page.locator('//input[@id="user_password_confirmation"]');
    this.signInButton = page.locator('//form[@id="new_user"]//input[@name="commit"]'); 
    this.logInButton = page.locator('//input[@id="login-button"]');
    this.signUpButton = page.locator('//a[@href="/user/sign_up"]');  
  }

  async enter_username(username: string): Promise<void> {
    const usernameTextBox = this.usernameTextBox;
    await usernameTextBox.fill(username);
  }

  async enter_password(password: string): Promise<void> {
    const passwordTextBox = this.passwordTextBox;
    await passwordTextBox.fill(password);
  }

  async enter_confirm_password(confirmPassword: string): Promise<void> {
    const confirmPasswordTextBox = this.confirmPasswordTextBox;
    await confirmPasswordTextBox.fill(confirmPassword);
  }

  async click_sign_in(): Promise<void> {
    const signInButton = this.signInButton;
    await signInButton.click();
  }

  async click_sign_up(): Promise<void> {
    const signUpButton = this.signUpButton;
    await signUpButton.click();
  }

  async click_log_in(): Promise<void> {
    const logInButton = this.logInButton;
    await logInButton.click();
  }
}
