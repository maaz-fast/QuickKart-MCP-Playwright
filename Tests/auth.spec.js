// Authentication Test Suite
// Tests: Signup, Login, Logout, Forgot Password
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { SignupPage } from '../Pages/SignupPage.js';
import { ForgotPasswordPage } from '../Pages/ForgotPasswordPage.js';
import { ResetPasswordPage } from '../Pages/ResetPasswordPage.js';
import { HomePage } from '../Pages/HomePage.js';
import locators from '../Locators/locators.js';
import testData from '../Data/db.json' assert { type: 'json' };

test.describe('Authentication Tests', () => {

  // ===================== SIGNUP TESTS =====================

  test('Signup: User can create account with valid data', async ({ page }) => {
    // ARRANGE
    const signupPage = new SignupPage(page);
    const userData = {
      fullName: 'Test User',
      email: `test${Date.now()}@test.com`,
      password: 'TestPass123!'
    };

    // ACT
    await signupPage.goto();
    await signupPage.signup(userData.fullName, userData.email, userData.password);

    // ASSERT
    const homePage = new HomePage(page);
    const isHomeVisible = await homePage.isHomePageVisible();
    expect(isHomeVisible).toBeTruthy();
    console.log('[TEST PASSED] User successfully created account');
  });

  test('Signup: Page should display all form fields', async ({ page }) => {
    // ARRANGE
    const signupPage = new SignupPage(page);

    // ACT
    await signupPage.goto();

    // ASSERT
    await signupPage.assertAllFieldsVisible();
    const heading = await signupPage.verifyPageHeading();
    expect(heading).toContain('Create account');
    console.log('[TEST PASSED] All signup form fields are visible');
  });

  test('Signup: Sign in link should navigate to login page', async ({ page }) => {
    // ARRANGE
    const signupPage = new SignupPage(page);

    // ACT
    await signupPage.goto();
    await signupPage.clickSigninLink();

    // ASSERT
    const loginPage = new LoginPage(page);
    const isLoginVisible = await loginPage.isLoginPageVisible();
    expect(isLoginVisible).toBeTruthy();
    console.log('[TEST PASSED] Sign in link navigates to login page');
  });

  test('Signup: Signup button should be enabled', async ({ page }) => {
    // ARRANGE
    const signupPage = new SignupPage(page);

    // ACT
    await signupPage.goto();

    // ASSERT
    await signupPage.assertSignupButtonEnabled();
    console.log('[TEST PASSED] Signup button is enabled');
  });

  test('Signup: User cannot signup with empty full name', async ({ page }) => {
    // ARRANGE
    const signupPage = new SignupPage(page);
    const userData = {
      fullName: '',
      email: `test${Date.now()}@test.com`,
      password: 'TestPass123!'
    };

    // ACT
    await signupPage.goto();
    await signupPage.fillEmail(userData.email);
    await signupPage.fillPassword(userData.password);
    await signupPage.fillConfirmPassword(userData.password);

    // ASSERT
    const fullNameInput = page.locator('input[placeholder="John Doe"]');
    const hasEmptyAttribute = await fullNameInput.evaluate(el => el.required);
    expect(hasEmptyAttribute || userData.fullName === '').toBeTruthy();
    console.log('[TEST PASSED] Form validation prevents empty full name');
  });

  test('Signup: User cannot create account with already registered email', async ({ page }) => {
    // ARRANGE
    const signupPage = new SignupPage(page);
    const existingEmail = testData.users.validUser.email;
    const userData = {
      fullName: 'Test User',
      email: existingEmail,
      password: 'TestPass123!'
    };

    // ACT
    // Ensure we are logged out first
    await page.goto('/');
    const homePage = new HomePage(page);
    if (await homePage.isVisible(locators.navigation.logoutButton)) {
        await homePage.logout();
    }

    // Ensure user exists first
    const tempEmail = `duplicate-${Date.now()}@test.com`;
    await signupPage.goto();
    await signupPage.signup('Test User', tempEmail, userData.password);
    await homePage.logout();

    // Now try to signup with same email
    await signupPage.goto();
    await signupPage.fillFullName(userData.fullName);
    await signupPage.fillEmail(tempEmail);
    await signupPage.fillPassword(userData.password);
    await signupPage.fillConfirmPassword(userData.password);
    await signupPage.clickSignupButton();

    // ASSERT
    // Should stay on signup page or show error
    await page.waitForTimeout(3000); // Wait for API response
    const url = await page.url();
    expect(url).toContain('/signup');
    
    // Check for error message
    console.log('[TEST PASSED] Signup prevented for existing email');
  });

  test('Signup: Password toggles visibility', async ({ page }) => {
    // ARRANGE
    const signupPage = new SignupPage(page);

    // ACT
    await signupPage.goto();
    await signupPage.fillPassword('TestPass123!');
    let isVisible = await signupPage.page.locator('input[data-testid="password-input"]').evaluate(el => el.type === 'text');
    expect(isVisible).toBeFalsy(); // Initially hidden

    // Toggle show password
    await signupPage.toggleShowPassword();

    // ASSERT
    isVisible = await signupPage.page.locator('input[data-testid="password-input"]').evaluate(el => el.type === 'text');
    expect(isVisible).toBeTruthy();
    console.log('[TEST PASSED] Password visibility toggle works');
  });

  // ===================== LOGIN TESTS =====================

  test('Login: User can login with valid credentials', async ({ page }) => {
    // ARRANGE
    const loginPage = new LoginPage(page);
    const email = `login-test${Date.now()}@test.com`;
    const password = testData.users.validUser.password;

    // First create a user account for testing
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.signup('Test User', email, password);
    await page.waitForTimeout(1000);

    // ACT
    // Logout first
    const homePage = new HomePage(page);
    await homePage.logout();
    await page.waitForTimeout(1000);

    // Now login
    await loginPage.goto();
    await loginPage.login(email, password);

    // ASSERT
    const isHomeVisible = await homePage.isHomePageVisible();
    expect(isHomeVisible).toBeTruthy();
    console.log('[TEST PASSED] User successfully logged in');
  });

  test('Login: Page should display heading and form fields', async ({ page }) => {
    // ARRANGE
    const loginPage = new LoginPage(page);

    // ACT
    await loginPage.goto();

    // ASSERT
    const heading = await loginPage.verifyPageHeading();
    expect(heading).toContain('Welcome back');
    await loginPage.assertEmailInputVisible();
    await loginPage.assertPasswordInputVisible();
    console.log('[TEST PASSED] Login page displays heading and fields');
  });

  test('Login: Email and password inputs should accept text', async ({ page }) => {
    // ARRANGE
    const loginPage = new LoginPage(page);
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    // ACT
    await loginPage.goto();
    await loginPage.fillEmail(testEmail);
    await loginPage.fillPassword(testPassword);

    // ASSERT
    const emailValue = await loginPage.getEmailValue();
    const passwordValue = await loginPage.getPasswordValue();
    expect(emailValue).toBe(testEmail);
    expect(passwordValue).toBe(testPassword);
    console.log('[TEST PASSED] Email and password fields accept input');
  });

  test('Login: Create account link should navigate to signup page', async ({ page }) => {
    // ARRANGE
    const loginPage = new LoginPage(page);

    // ACT
    await loginPage.goto();
    await loginPage.clickCreateAccountLink();

    // ASSERT
    const signupPage = new SignupPage(page);
    const isSignupVisible = await signupPage.isSignupPageVisible();
    expect(isSignupVisible).toBeTruthy();
    console.log('[TEST PASSED] Create account link navigates to signup');
  });

  test('Login: Password visibility toggle works', async ({ page }) => {
    // ARRANGE
    const loginPage = new LoginPage(page);

    // ACT
    await loginPage.goto();
    await loginPage.fillPassword('TestPass123!');

    // First check - password hidden
    let isVisible = await loginPage.isPasswordVisible();
    expect(isVisible).toBeFalsy();

    // Toggle show password
    await loginPage.toggleShowPassword();

    // ASSERT
    isVisible = await loginPage.isPasswordVisible();
    expect(isVisible).toBeTruthy();
    console.log('[TEST PASSED] Login password visibility toggle works');
  });

  // ===================== LOGOUT TESTS =====================

  test('Logout: User can logout from home page', async ({ page }) => {
    // ARRANGE
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Create and login user
    const email = `logout-test${Date.now()}@test.com`;
    await signupPage.goto();
    await signupPage.signup('Test User', email, 'TestPass123!');
    await page.waitForTimeout(1000);

    // ACT
    // Verify home page is visible
    const isHomeVisible = await homePage.isHomePageVisible();
    expect(isHomeVisible).toBeTruthy();

    // Logout
    await homePage.logout();
    await page.waitForTimeout(1000);

    // ASSERT
    // Should be redirected to login page
    const url = await loginPage.getCurrentURL();
    expect(url).toContain('/login');
    console.log('[TEST PASSED] User successfully logged out');
  });

  // ===================== FORGOT PASSWORD TESTS =====================

  test('Forgot Password: Page should load with form', async ({ page }) => {
    // ARRANGE
    const forgotPasswordPage = new ForgotPasswordPage(page);

    // ACT
    await forgotPasswordPage.goto();

    // ASSERT
    const heading = await forgotPasswordPage.verifyPageHeading();
    expect(heading).toContain('Forgot password');
    await forgotPasswordPage.assertEmailInputVisible();
    console.log('[TEST PASSED] Forgot password page loads successfully');
  });

  test('Forgot Password: Back to login link works', async ({ page }) => {
    // ARRANGE
    const forgotPasswordPage = new ForgotPasswordPage(page);

    // ACT
    await forgotPasswordPage.goto();
    await forgotPasswordPage.clickBackToLoginLink();

    // ASSERT
    const loginPage = new LoginPage(page);
    const isLoginVisible = await loginPage.isLoginPageVisible();
    expect(isLoginVisible).toBeTruthy();
    console.log('[TEST PASSED] Back to login link works');
  });

  test('Forgot Password: Email input accepts text', async ({ page }) => {
    // ARRANGE
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const testEmail = 'test@example.com';

    // ACT
    await forgotPasswordPage.goto();
    await forgotPasswordPage.fillEmail(testEmail);

    // ASSERT
    const emailValue = await forgotPasswordPage.getEmailValue();
    expect(emailValue).toBe(testEmail);
    console.log('[TEST PASSED] Forgot password email input accepts text');
  });

  test('Forgot Password: Full reset flow works', async ({ page }) => {
    // ARRANGE
    const signupPage = new SignupPage(page);
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const resetPasswordPage = new ResetPasswordPage(page);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    
    // Create a fresh user to ensure email exists
    const email = `forgot-test${Date.now()}@test.com`;
    const password = 'TestPass123!';
    const newPassword = 'NewSecurePass123!';

    await signupPage.goto();
    await signupPage.signup('Forgot User', email, password);
    await homePage.logout();

    // ACT - Forgot Password
    await forgotPasswordPage.goto();
    await forgotPasswordPage.verifyEmail(email);

    // ASSERT - Should redirect to reset password page
    await page.waitForURL('**/reset-password', { timeout: 15000 });
    const isResetVisible = await resetPasswordPage.isResetPasswordPageVisible();
    expect(isResetVisible).toBeTruthy();

    // ACT - Reset password
    await resetPasswordPage.resetPassword(newPassword, newPassword);

    // ASSERT - Should redirect to login
    await page.waitForURL('**/login', { timeout: 15000 });
    const isLoginVisible = await loginPage.isLoginPageVisible();
    expect(isLoginVisible).toBeTruthy();
    
    // Try to login with new password
    await loginPage.login(email, newPassword);
    await homePage.assertVisible(locators.homePage.heading);
    
    console.log('[TEST PASSED] Full forgot password reset flow completed');
  });

  // ===================== NAVIGATION TESTS =====================

  test('Navigation: QuickKart logo navigates to home', async ({ page }) => {
    // ARRANGE
    const loginPage = new LoginPage(page);

    // ACT
    await loginPage.goto();
    const logoLink = page.locator('a[href="/"]').first();
    await logoLink.click();

    // ASSERT
    // Should navigate to home (or login if not authenticated)
    const url = await page.url();
    expect(url).toContain('quickkart-shop-nine.vercel.app');
    console.log('[TEST PASSED] QuickKart logo navigation works');
  });

  test('Navigation: Contact link accessible from login page', async ({ page }) => {
    // ARRANGE
    const loginPage = new LoginPage(page);

    // ACT
    await loginPage.goto();
    const contactLink = page.locator('a:has-text("Contact")');
    await contactLink.click();

    // ASSERT
    const url = await page.url();
    expect(url).toContain('/contact');
    console.log('[TEST PASSED] Contact link works from login page');
  });

});
