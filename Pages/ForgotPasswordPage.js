// ForgotPasswordPage - Handles forgot password functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class ForgotPasswordPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.forgotPasswordPage;
  }

  // Navigate to forgot password page
  async goto() {
    console.log('[FORGOT PASSWORD PAGE] Navigating to forgot password page');
    await this.page.goto('/forgot-password');
  }

  // Check if page is visible
  async isForgotPasswordPageVisible() {
    console.log('[FORGOT PASSWORD PAGE] Checking if page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Verify page heading
  async verifyPageHeading() {
    console.log('[FORGOT PASSWORD PAGE] Verifying heading');
    await this.assertVisible(this.locators.heading);
    const headingText = await this.getText(this.locators.heading);
    return headingText;
  }

  // Fill email field
  async fillEmail(email) {
    console.log(`[FORGOT PASSWORD PAGE] Filling email: ${email}`);
    await this.fill(this.locators.emailInput, email);
  }

  // Click verify email button
  async clickVerifyEmailButton() {
    console.log('[FORGOT PASSWORD PAGE] Clicking verify email button');
    await this.click(this.locators.verifyEmailButton);
  }

  // Verify email and submit
  async verifyEmail(email) {
    console.log('[FORGOT PASSWORD PAGE] Starting verify flow');
    await this.fillEmail(email);
    await this.clickVerifyEmailButton();
  }

  // Click back to login link
  async clickBackToLoginLink() {
    console.log('[FORGOT PASSWORD PAGE] Clicking back to login link');
    await this.click(this.locators.backToLoginLink);
  }

  // Assert email input is visible
  async assertEmailInputVisible() {
    console.log('[FORGOT PASSWORD PAGE] Asserting email input is visible');
    await this.assertVisible(this.locators.emailInput);
  }

  // Clear email field
  async clearEmail() {
    console.log('[FORGOT PASSWORD PAGE] Clearing email field');
    await this.clear(this.locators.emailInput);
  }

  // Get email value
  async getEmailValue() {
    console.log('[FORGOT PASSWORD PAGE] Getting email value');
    return await this.getInputValue(this.locators.emailInput);
  }
}

export default ForgotPasswordPage;
