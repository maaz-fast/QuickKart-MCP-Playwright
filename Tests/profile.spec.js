// Profile/Account Test Suite
// Tests: Profile page, orders page, wishlist page, account management
import { test, expect } from '@playwright/test';
import { SignupPage } from '../Pages/SignupPage.js';
import { HomePage } from '../Pages/HomePage.js';
import { ProfilePage } from '../Pages/ProfilePage.js';
import { OrdersPage } from '../Pages/OrdersPage.js';
import { WishlistPage } from '../Pages/WishlistPage.js';

test.describe('Profile/Account Tests', () => {

  // Setup: Create user and login before each test
  test.beforeEach(async ({ page }) => {
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);

    // Create and login user
    const email = `profile-test${Date.now()}@test.com`;
    await signupPage.goto();
    await signupPage.signup('Test User', email, 'TestPass123!');
    await page.waitForTimeout(1000);

    // Verify home page loaded
    const isHomeVisible = await homePage.isHomePageVisible();
    expect(isHomeVisible).toBeTruthy();
  });

  // ===================== PROFILE PAGE TESTS =====================

  test('Profile: Page should load when accessed', async ({ page }) => {
    // ARRANGE
    const profilePage = new ProfilePage(page);

    // ACT
    await profilePage.goto();

    // ASSERT
    const isProfileVisible = await profilePage.isProfilePageVisible();
    expect(isProfileVisible).toBeTruthy();
    console.log('[TEST PASSED] Profile page loads successfully');
  });

  test('Profile: Should display user information', async ({ page }) => {
    // ARRANGE
    const profilePage = new ProfilePage(page);

    // ACT
    await profilePage.goto();

    // ASSERT
    await profilePage.assertProfilePageLoaded();
    const userInfo = await profilePage.getUserInfo();
    console.log(`[TEST PASSED] Profile displays user information: ${userInfo}`);
  });

  test('Profile: Navigation links should work', async ({ page }) => {
    // ARRANGE
    const profilePage = new ProfilePage(page);
    const homePage = new HomePage(page);
    const ordersPage = new OrdersPage(page);

    // ACT
    await profilePage.goto();
    await profilePage.goToHome();

    // ASSERT
    const isHomeVisible = await homePage.isHomePageVisible();
    expect(isHomeVisible).toBeTruthy();
    console.log('[TEST PASSED] Profile navigation to home works');

    // Test orders navigation
    await profilePage.goto();
    await profilePage.goToOrders();

    const isOrdersVisible = await ordersPage.isOrdersPageVisible();
    expect(isOrdersVisible).toBeTruthy();
    console.log('[TEST PASSED] Profile navigation to orders works');
  });

  test('Profile: Logout should work from profile page', async ({ page }) => {
    // ARRANGE
    const profilePage = new ProfilePage(page);

    // ACT
    await profilePage.goto();
    await profilePage.logout();

    // ASSERT
    const url = await page.url();
    expect(url).toContain('/login');
    console.log('[TEST PASSED] Logout from profile page works');
  });

  test('Profile: Should upload User Profile picture', async ({ page }) => {
    // ARRANGE
    const profilePage = new ProfilePage(page);
    const path = require('path');
    
    // ACT
    await profilePage.goto();
    const filePath = path.resolve('Resources/User_Avatar.png');
    await profilePage.uploadProfilePicture(filePath);
    
    // ASSERT
    await expect(page.locator('text=/Profile image updated!/i')).toBeVisible();
    console.log('[TEST PASSED] User profile picture uploaded successfully');
  });

  // ===================== ORDERS PAGE TESTS =====================

  test('Orders: Page should load when accessed', async ({ page }) => {
    // ARRANGE
    const ordersPage = new OrdersPage(page);

    // ACT
    await ordersPage.goto();

    // ASSERT
    const isOrdersVisible = await ordersPage.isOrdersPageVisible();
    expect(isOrdersVisible).toBeTruthy();
    console.log('[TEST PASSED] Orders page loads successfully');
  });

  test('Orders: Should display appropriate message for new users', async ({ page }) => {
    // ARRANGE
    const ordersPage = new OrdersPage(page);

    // ACT
    await ordersPage.goto();

    // ASSERT
    await ordersPage.assertOrdersPageLoaded();
    const hasNoOrders = await ordersPage.hasNoOrders();
    expect(hasNoOrders).toBeTruthy();
    console.log('[TEST PASSED] Orders page shows no orders message for new users');
  });

  test('Orders: Navigation links should work', async ({ page }) => {
    // ARRANGE
    const ordersPage = new OrdersPage(page);
    const homePage = new HomePage(page);

    // ACT
    await ordersPage.goto();
    await ordersPage.goToHome();

    // ASSERT
    const isHomeVisible = await homePage.isHomePageVisible();
    expect(isHomeVisible).toBeTruthy();
    console.log('[TEST PASSED] Orders navigation to home works');

    // Test cart navigation
    await ordersPage.goto();
    await ordersPage.goToCart();

    const url = await page.url();
    expect(url).toContain('/cart');
    console.log('[TEST PASSED] Orders navigation to cart works');
  });

  // ===================== WISHLIST PAGE TESTS =====================

  test('Wishlist: Page should load when accessed', async ({ page }) => {
    // ARRANGE
    const wishlistPage = new WishlistPage(page);

    // ACT
    await wishlistPage.goto();

    // ASSERT
    const isWishlistVisible = await wishlistPage.isWishlistPageVisible();
    expect(isWishlistVisible).toBeTruthy();
    console.log('[TEST PASSED] Wishlist page loads successfully');
  });

  test('Wishlist: Should display empty message for new users', async ({ page }) => {
    // ARRANGE
    const wishlistPage = new WishlistPage(page);

    // ACT
    await wishlistPage.goto();

    // ASSERT
    const isEmpty = await wishlistPage.isWishlistEmpty();
    expect(isEmpty).toBeTruthy();
    console.log('[TEST PASSED] Wishlist shows empty message for new users');
  });

  test('Wishlist: Explore products button should navigate to home', async ({ page }) => {
    // ARRANGE
    const wishlistPage = new WishlistPage(page);
    const homePage = new HomePage(page);

    // ACT
    await wishlistPage.goto();
    await wishlistPage.clickExploreButton();

    // ASSERT
    const isHomeVisible = await homePage.isHomePageVisible();
    expect(isHomeVisible).toBeTruthy();
    console.log('[TEST PASSED] Wishlist explore products button navigates to home');
  });

  test('Wishlist: Navigation links should work', async ({ page }) => {
    // ARRANGE
    const wishlistPage = new WishlistPage(page);
    const homePage = new HomePage(page);

    // ACT
    await wishlistPage.goto();
    await wishlistPage.goToHome();

    // ASSERT
    const isHomeVisible = await homePage.isHomePageVisible();
    expect(isHomeVisible).toBeTruthy();
    console.log('[TEST PASSED] Wishlist navigation to home works');

    // Test cart navigation
    await wishlistPage.goto();
    await wishlistPage.goToCart();

    const url = await page.url();
    expect(url).toContain('/cart');
    console.log('[TEST PASSED] Wishlist navigation to cart works');
  });

  // ===================== NAVIGATION TESTS =====================

  test('Navigation: Profile link should be accessible from home', async ({ page }) => {
    // ARRANGE
    const homePage = new HomePage(page);

    // ACT
    await homePage.goto();
    await homePage.goToProfile();

    // ASSERT
    const url = await page.url();
    expect(url).toContain('/profile');
    console.log('[TEST PASSED] Profile link accessible from home page');
  });

  test('Navigation: Orders link should be accessible from home', async ({ page }) => {
    // ARRANGE
    const homePage = new HomePage(page);

    // ACT
    await homePage.goto();
    await homePage.goToOrders();

    // ASSERT
    const url = await page.url();
    expect(url).toContain('/orders');
    console.log('[TEST PASSED] Orders link accessible from home page');
  });

  test('Navigation: Wishlist link should be accessible from home', async ({ page }) => {
    // ARRANGE
    const homePage = new HomePage(page);

    // ACT
    await homePage.goto();
    await homePage.goToWishlist();

    // ASSERT
    const url = await page.url();
    expect(url).toContain('/wishlist');
    console.log('[TEST PASSED] Wishlist link accessible from home page');
  });

  // ===================== ACCOUNT MANAGEMENT TESTS =====================

  test('Account: User should be able to access all account pages', async ({ page }) => {
    // ARRANGE
    const homePage = new HomePage(page);
    const profilePage = new ProfilePage(page);
    const ordersPage = new OrdersPage(page);
    const wishlistPage = new WishlistPage(page);

    // ACT & ASSERT
    await homePage.goto();
    await homePage.goToProfile();
    expect(await page.url()).toContain('/profile');

    await profilePage.goToOrders();
    expect(await page.url()).toContain('/orders');

    await ordersPage.goToCart();
    expect(await page.url()).toContain('/cart');

    await wishlistPage.goto();
    expect(await page.url()).toContain('/wishlist');

    console.log('[TEST PASSED] User can access all account pages');
  });

  // ===================== EDGE CASES =====================

  test('Profile: Page should handle loading states', async ({ page }) => {
    // ARRANGE
    const profilePage = new ProfilePage(page);

    // ACT
    await profilePage.goto();

    // ASSERT
    // Check if loading indicators disappear
    const loadingText = page.locator('text=/Loading Profile/');
    await expect(loadingText).toBeHidden({ timeout: 10000 });
    console.log('[TEST PASSED] Profile page handles loading states');
  });

  test('Orders: Page should handle loading states', async ({ page }) => {
    // ARRANGE
    const ordersPage = new OrdersPage(page);

    // ACT
    await ordersPage.goto();

    // ASSERT
    // Check if loading indicators disappear
    const loadingText = page.locator('text=/Retrieving Purchase History/');
    await expect(loadingText).toBeHidden({ timeout: 10000 });
    console.log('[TEST PASSED] Orders page handles loading states');
  });

  test('Wishlist: Page should handle loading states', async ({ page }) => {
    // ARRANGE
    const wishlistPage = new WishlistPage(page);

    // ACT
    await wishlistPage.goto();

    // ASSERT
    // Check if loading indicators disappear
    const loadingText = page.locator('text=/Loading your wishlist/');
    await expect(loadingText).toBeHidden({ timeout: 10000 });
    console.log('[TEST PASSED] Wishlist page handles loading states');
  });

});
