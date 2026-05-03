// ResetPasswordPage - Handles resetting user password
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class ResetPasswordPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.resetPasswordPage;
  }

  // Check if page is visible
  async isResetPasswordPageVisible() {
    console.log('[RESET PASSWORD PAGE] Checking if page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Get email being reset
  async getEmailDisplay() {
    console.log('[RESET PASSWORD PAGE] Getting displayed email');
    return await this.getText(this.locators.emailDisplay);
  }

  // Fill new password
  async fillPassword(password) {
    console.log('[RESET PASSWORD PAGE] Filling new password');
    await this.fill(this.locators.passwordInput, password);
  }

  // Fill confirm password
  async fillConfirmPassword(password) {
    console.log('[RESET PASSWORD PAGE] Filling confirm password');
    await this.fill(this.locators.confirmPasswordInput, password);
  }

  // Toggle show password
  async toggleShowPassword() {
    console.log('[RESET PASSWORD PAGE] Toggling password visibility');
    await this.click(this.locators.showPasswordButton);
  }

  // Toggle show confirm password
  async toggleShowConfirmPassword() {
    console.log('[RESET PASSWORD PAGE] Toggling confirm password visibility');
    await this.click(this.locators.showConfirmPasswordButton);
  }

  // Click reset button
  async clickResetButton() {
    console.log('[RESET PASSWORD PAGE] Clicking reset button');
    await this.click(this.locators.resetButton);
  }

  // Complete reset flow
  async resetPassword(password, confirmPassword) {
    console.log('[RESET PASSWORD PAGE] Starting reset flow');
    await this.fillPassword(password);
    await this.fillConfirmPassword(confirmPassword);
    await this.clickResetButton();
  }
}

export default ResetPasswordPage;
