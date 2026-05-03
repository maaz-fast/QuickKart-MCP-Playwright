// SignupPage - Handles signup/registration functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class SignupPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.signupPage;
  }

  // Navigate to signup page
  async goto() {
    console.log('[SIGNUP PAGE] Navigating to signup page');
    await this.page.goto('/signup');
  }

  // Check if signup page is displayed
  async isSignupPageVisible() {
    console.log('[SIGNUP PAGE] Checking if signup page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Verify page heading
  async verifyPageHeading() {
    console.log('[SIGNUP PAGE] Verifying heading');
    await this.assertVisible(this.locators.heading);
    const headingText = await this.getText(this.locators.heading);
    console.log(`[SIGNUP PAGE] Heading: ${headingText}`);
    return headingText;
  }

  // Fill full name field
  async fillFullName(fullName) {
    console.log(`[SIGNUP PAGE] Filling full name: ${fullName}`);
    await this.fill(this.locators.fullNameInput, fullName);
  }

  // Fill email field
  async fillEmail(email) {
    console.log(`[SIGNUP PAGE] Filling email: ${email}`);
    await this.fill(this.locators.emailInput, email);
  }

  // Fill password field
  async fillPassword(password) {
    console.log('[SIGNUP PAGE] Filling password');
    await this.fill(this.locators.passwordInput, password);
  }

  // Fill confirm password field
  async fillConfirmPassword(password) {
    console.log('[SIGNUP PAGE] Filling confirm password');
    await this.fill(this.locators.confirmPasswordInput, password);
  }

  // Toggle show password
  async toggleShowPassword() {
    console.log('[SIGNUP PAGE] Toggling show password');
    await this.click(this.locators.showPasswordButton);
  }

  // Toggle show confirm password
  async toggleShowConfirmPassword() {
    console.log('[SIGNUP PAGE] Toggling show confirm password');
    await this.click(this.locators.showConfirmPasswordButton);
  }

  // Click signup button
  async clickSignupButton() {
    console.log('[SIGNUP PAGE] Clicking signup button');
    await this.click(this.locators.signupButton);
  }

  // Complete signup flow
  async signup(fullName, email, password) {
    console.log('[SIGNUP PAGE] Starting signup flow');
    await this.fillFullName(fullName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(password);
    await this.clickSignupButton();
    
    // Wait for account creation and redirect
    await this.page.waitForURL('**/', { waitUntil: 'networkidle' });
    console.log('[SIGNUP PAGE] Signup completed');
  }

  // Click sign in link
  async clickSigninLink() {
    console.log('[SIGNUP PAGE] Clicking sign in link');
    await this.click(this.locators.signinLink);
  }

  // Verify all fields are visible
  async assertAllFieldsVisible() {
    console.log('[SIGNUP PAGE] Asserting all fields are visible');
    await this.assertVisible(this.locators.fullNameInput);
    await this.assertVisible(this.locators.emailInput);
    await this.assertVisible(this.locators.passwordInput);
    await this.assertVisible(this.locators.confirmPasswordInput);
  }

  // Verify signup button is enabled
  async assertSignupButtonEnabled() {
    console.log('[SIGNUP PAGE] Asserting signup button is enabled');
    await this.assertEnabled(this.locators.signupButton);
  }

  // Clear full name field
  async clearFullName() {
    console.log('[SIGNUP PAGE] Clearing full name field');
    await this.clear(this.locators.fullNameInput);
  }

  // Clear email field
  async clearEmail() {
    console.log('[SIGNUP PAGE] Clearing email field');
    await this.clear(this.locators.emailInput);
  }

  // Clear password field
  async clearPassword() {
    console.log('[SIGNUP PAGE] Clearing password field');
    await this.clear(this.locators.passwordInput);
  }

  // Clear confirm password field
  async clearConfirmPassword() {
    console.log('[SIGNUP PAGE] Clearing confirm password field');
    await this.clear(this.locators.confirmPasswordInput);
  }

  // Get full name value
  async getFullNameValue() {
    console.log('[SIGNUP PAGE] Getting full name value');
    return await this.getInputValue(this.locators.fullNameInput);
  }

  // Get email value
  async getEmailValue() {
    console.log('[SIGNUP PAGE] Getting email value');
    return await this.getInputValue(this.locators.emailInput);
  }

  // Get password value
  async getPasswordValue() {
    console.log('[SIGNUP PAGE] Getting password value');
    return await this.getInputValue(this.locators.passwordInput);
  }
}

export default SignupPage;
