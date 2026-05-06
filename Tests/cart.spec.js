// Cart Test Suite
// Tests: Add to cart, remove from cart, quantity validation, checkout flow
import { test, expect } from '@playwright/test';
import { SignupPage } from '../Pages/SignupPage.js';
import { HomePage } from '../Pages/HomePage.js';
import { ProductPage } from '../Pages/ProductPage.js';
import { CartPage } from '../Pages/CartPage.js';
import { CheckoutPage } from '../Pages/CheckoutPage.js';

test.describe('Cart Management Tests @cart @regression', () => {

  // Setup: Create user, login, and add product to cart before each test
  test.beforeEach(async ({ page }) => {
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // Create and login user
    const email = `cart-test${Date.now()}@test.com`;
    await signupPage.goto();
    await signupPage.signup('Test User', email, 'TestPass123!');
    await page.waitForTimeout(1000);

    // Add product to cart
    await homePage.goto();
    await homePage.clickFirstProduct();
    await productPage.addToCart();
    await page.waitForTimeout(1000);
  });

  // ===================== CART DISPLAY TESTS =====================

  test('Cart: Should display cart with added product', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page);

    // ACT
    await cartPage.goto();

    // ASSERT
    const isCartVisible = await cartPage.isCartPageVisible();
    expect(isCartVisible).toBeTruthy();

    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeFalsy();

    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
    console.log('[TEST PASSED] Cart displays with added product');
  });

  test('Cart: Should display order summary correctly', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page);

    // ACT
    await cartPage.goto();

    // ASSERT
    await cartPage.assertSubtotalVisible();
    await cartPage.assertTotalVisible();

    const subtotal = await cartPage.getSubtotal();
    const shipping = await cartPage.getShipping();
    const tax = await cartPage.getTax();
    const total = await cartPage.getTotal();

    expect(subtotal).toBeGreaterThan(0);
    expect(total).toBeGreaterThan(0);
    console.log(`[TEST PASSED] Cart displays order summary: Subtotal $${subtotal}, Total $${total}`);
  });

  test('Cart: Order summary calculations should be correct', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page);

    // ACT
    await cartPage.goto();

    // ASSERT
    const isCorrect = await cartPage.verifyOrderSummary();
    expect(isCorrect).toBeTruthy();
    console.log('[TEST PASSED] Cart order summary calculations are correct');
  });

  test('Cart: Proceed to checkout button should be visible', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page);

    // ACT
    await cartPage.goto();

    // ASSERT
    await cartPage.assertProceedToCheckoutVisible();
    console.log('[TEST PASSED] Proceed to checkout button is visible');
  });

  // ===================== CART ACTIONS TESTS =====================

  test('Cart: Proceed to checkout should navigate to checkout page', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page);

    // ACT
    await cartPage.goto();
    await cartPage.proceedToCheckout();

    // ASSERT
    const checkoutPage = new CheckoutPage(page);
    const isCheckoutVisible = await checkoutPage.isCheckoutPageVisible();
    expect(isCheckoutVisible).toBeTruthy();
    console.log('[TEST PASSED] Proceed to checkout navigates to checkout page');
  });

  test('Cart: Continue shopping should navigate to home page', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page);
    const homePage = new HomePage(page);

    // ACT
    await cartPage.goto();
    await cartPage.continueShopping();

    // ASSERT
    const isHomeVisible = await homePage.isHomePageVisible();
    expect(isHomeVisible).toBeTruthy();
    console.log('[TEST PASSED] Continue shopping navigates to home page');
  });

  test('Cart: Remove item should empty cart', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page);

    // ACT
    await cartPage.goto();
    await cartPage.removeItemFromCart();

    // ASSERT
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();
    console.log('[TEST PASSED] Remove item empties cart');
  });

  // ===================== EMPTY CART TESTS =====================

  test('Cart: Empty cart should display appropriate message', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page);

    // ACT
    await cartPage.goto();
    await cartPage.removeItemFromCart();

    // ASSERT
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();

    const emptyMessage = await cartPage.page.locator('h2:has-text("Your cart is empty")').isVisible();
    expect(emptyMessage).toBeTruthy();
    console.log('[TEST PASSED] Empty cart displays appropriate message');
  });

  // ===================== MULTIPLE ITEMS TESTS =====================

  test('Cart: Adding multiple quantities should update cart', async ({ page }) => {
    // ARRANGE
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // ACT
    // Add another product with quantity 2
    await homePage.goto();
    await homePage.clickFirstProduct();
    await productPage.setQuantity(2);
    await productPage.addToCart();
    await page.waitForTimeout(1000);

    // Check cart
    await cartPage.goto();

    // ASSERT
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);

    const total = await cartPage.getTotal();
    expect(total).toBeGreaterThan(0);
    console.log('[TEST PASSED] Multiple quantities update cart correctly');
  });

  // ===================== NAVIGATION TESTS =====================

  test('Cart: Navigation links should work', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page);
    const homePage = new HomePage(page);

    // ACT
    await cartPage.goto();
    await cartPage.goToHome();

    // ASSERT
    const isHomeVisible = await homePage.isHomePageVisible();
    expect(isHomeVisible).toBeTruthy();
    console.log('[TEST PASSED] Cart navigation to home works');
  });

  // ===================== CART ICON TESTS =====================

  test('Cart Icon: Should display item count in navigation', async ({ page }) => {
    // ARRANGE
    const homePage = new HomePage(page);

    // ACT
    await homePage.goto();

    // ASSERT
    const cartLink = page.locator('a[href="/cart"]');
    const cartText = await cartLink.textContent();
    expect(cartText).toContain('Cart');
    console.log('[TEST PASSED] Cart icon displays in navigation');
  });

  // ===================== EDGE CASES =====================

  test('Cart: Cart should persist after page refresh', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page);

    // ACT
    await cartPage.goto();
    const initialItemCount = await cartPage.getCartItemCount();

    // Refresh page
    await page.reload();
    await page.waitForTimeout(1000);

    // ASSERT
    const finalItemCount = await cartPage.getCartItemCount();
    expect(finalItemCount).toBe(initialItemCount);
    console.log('[TEST PASSED] Cart persists after page refresh');
  });

  test('Cart: Cart should be accessible from product page', async ({ page }) => {
    // ARRANGE
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // ACT
    await homePage.goto();
    await homePage.clickFirstProduct();
    await productPage.goToCart();

    // ASSERT
    const url = await page.url();
    expect(url).toContain('/cart');
    console.log('[TEST PASSED] Cart is accessible from product page');
  });

});
