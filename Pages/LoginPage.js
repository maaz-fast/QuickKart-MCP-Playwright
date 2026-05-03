// LoginPage - Handles login functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.loginPage;
  }

  // Navigate to login page
  async goto() {
    console.log('[LOGIN PAGE] Navigating to login page');
    await this.page.goto('/login');
  }

  // Check if login page is displayed
  async isLoginPageVisible() {
    console.log('[LOGIN PAGE] Checking if login page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Verify page heading
  async verifyPageHeading() {
    console.log('[LOGIN PAGE] Verifying heading');
    await this.assertVisible(this.locators.heading);
    const headingText = await this.getText(this.locators.heading);
    console.log(`[LOGIN PAGE] Heading: ${headingText}`);
    return headingText;
  }

  // Fill email field
  async fillEmail(email) {
    console.log(`[LOGIN PAGE] Filling email: ${email}`);
    await this.fill(this.locators.emailInput, email);
  }

  // Fill password field
  async fillPassword(password) {
    console.log(`[LOGIN PAGE] Filling password`);
    await this.fill(this.locators.passwordInput, password);
  }

  // Click show password button
  async toggleShowPassword() {
    console.log('[LOGIN PAGE] Toggling show password');
    await this.click(this.locators.showPasswordButton);
  }

  // Check if password is visible
  async isPasswordVisible() {
    console.log('[LOGIN PAGE] Checking if password is visible');
    const inputType = await this.getAttribute(this.locators.passwordInput, 'type');
    return inputType === 'text';
  }

  // Click login button
  async clickLoginButton() {
    console.log('[LOGIN PAGE] Clicking login button');
    await this.click(this.locators.loginButton);
  }

  // Login with credentials
  async login(email, password) {
    console.log(`[LOGIN PAGE] Logging in with email: ${email}`);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
    
    // Wait for navigation to home page
    // Wait for navigation to home page or admin dashboard
    await this.page.waitForURL(url => url.href.includes('/admin/dashboard') || url.pathname === '/', { waitUntil: 'networkidle' });
    console.log('[LOGIN PAGE] Login completed');
  }

  // Click forgot password link
  async clickForgotPasswordLink() {
    console.log('[LOGIN PAGE] Clicking forgot password link');
    await this.click(this.locators.forgotPasswordLink);
  }

  // Click create account link
  async clickCreateAccountLink() {
    console.log('[LOGIN PAGE] Clicking create account link');
    await this.click(this.locators.createAccountLink);
  }

  // Verify email input is visible
  async assertEmailInputVisible() {
    console.log('[LOGIN PAGE] Asserting email input is visible');
    await this.assertVisible(this.locators.emailInput);
  }

  // Verify password input is visible
  async assertPasswordInputVisible() {
    console.log('[LOGIN PAGE] Asserting password input is visible');
    await this.assertVisible(this.locators.passwordInput);
  }

  // Verify login button is clickable
  async assertLoginButtonEnabled() {
    console.log('[LOGIN PAGE] Asserting login button is enabled');
    await this.assertEnabled(this.locators.loginButton);
  }

  // Clear email field
  async clearEmail() {
    console.log('[LOGIN PAGE] Clearing email field');
    await this.clear(this.locators.emailInput);
  }

  // Clear password field
  async clearPassword() {
    console.log('[LOGIN PAGE] Clearing password field');
    await this.clear(this.locators.passwordInput);
  }

  // Get email input value
  async getEmailValue() {
    console.log('[LOGIN PAGE] Getting email value');
    return await this.getInputValue(this.locators.emailInput);
  }

  // Get password input value
  async getPasswordValue() {
    console.log('[LOGIN PAGE] Getting password value');
    return await this.getInputValue(this.locators.passwordInput);
  }
}

export default LoginPage;
