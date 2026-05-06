// Checkout Test Suite
// Tests: Shipping info, Payment details, Order summary, Order completion
import { test, expect } from '@playwright/test';
import { SignupPage } from '../Pages/SignupPage.js';
import { HomePage } from '../Pages/HomePage.js';
import { ProductPage } from '../Pages/ProductPage.js';
import { CartPage } from '../Pages/CartPage.js';
import { CheckoutPage } from '../Pages/CheckoutPage.js';
import { OrdersPage } from '../Pages/OrdersPage.js';
import testData from '../Data/db.json' assert { type: 'json' };

test.describe('Checkout Flow Tests @checkout @regression', () => {

  test.beforeEach(async ({ page }) => {
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // 1. Create and login user
    const email = `checkout-test${Date.now()}@test.com`;
    await signupPage.goto();
    await signupPage.signup('Test User', email, 'TestPass123!');
    await page.waitForTimeout(1000);

    // 2. Add product to cart
    await homePage.goto();
    await homePage.clickFirstProduct();
    await productPage.addToCart();
    await page.waitForTimeout(1000);

    // 3. Go to cart and proceed to checkout
    await cartPage.goto();
    await cartPage.proceedToCheckout();
  });

  test('Checkout: Page should display all required sections', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.assertCheckoutPageVisible();
    await checkoutPage.assertShippingInfoVisible();
    await checkoutPage.assertPaymentDetailsVisible();
    await checkoutPage.assertOrderSummaryVisible();
    
    console.log('[TEST PASSED] Checkout page displays all sections');
  });

  test('Checkout: Should be able to fill shipping information', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const shippingData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      address: '123 Test Lane',
      city: 'Test City',
      zip: '12345'
    };

    await checkoutPage.fillShippingInfo(
      shippingData.firstName,
      shippingData.lastName,
      shippingData.email,
      shippingData.phone,
      shippingData.address,
      shippingData.city,
      shippingData.zip
    );

    // Verify values (optional but good)
    expect(await checkoutPage.getInputValue(checkoutPage.locators.firstNameInput)).toBe(shippingData.firstName);
    console.log('[TEST PASSED] Shipping information filled correctly');
  });

  test('Checkout: Should complete full checkout flow successfully', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const ordersPage = new OrdersPage(page);

    // Fill shipping
    await checkoutPage.fillShippingInfo('John', 'Doe', 'john@example.com', '1234567890', '123 Street', 'Karachi', '54000');
    
    // Fill payment
    await checkoutPage.fillPaymentDetails('John Doe', '4111111111111111', '12/30', '123');
    
    // Place order
    await checkoutPage.placeOrder();
    
    // Handle success screen
    console.log('[CHECKOUT PAGE] Waiting for success screen');
    await page.waitForSelector('[data-testid="order-success-screen"]');
    await page.click('[data-testid="view-orders-button"]');
    
    // ASSERT - Redirected to orders or confirmation
    await ordersPage.waitForURL('/orders');
    const isOrdersVisible = await ordersPage.isOrdersPageVisible();
    expect(isOrdersVisible).toBeTruthy();
    
    // ASSERT - At least one order should be present
    const hasNoOrders = await ordersPage.hasNoOrders();
    expect(hasNoOrders).toBeFalsy();
    
    console.log('[TEST PASSED] Full checkout flow completed successfully');
  });

  test('Checkout: Validation prevents placing order without info', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    // Try to place order without filling anything
    await checkoutPage.placeOrder();
    
    // ASSERT - Still on checkout page (due to form validation)
    const url = await page.url();
    expect(url).toContain('/checkout');
    
    console.log('[TEST PASSED] Checkout validation prevents order placement with empty fields');
  });

});
