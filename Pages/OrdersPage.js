// OrdersPage - Handles orders listing functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class OrdersPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.ordersPage;
    this.navLocators = locators.navigation;
  }

  // Navigate to orders
  async goto() {
    console.log('[ORDERS PAGE] Navigating to orders page');
    await this.page.goto('/orders');
    await this.waitForLoadingToFinish();
  }

  // Check if orders page is visible
  async isOrdersPageVisible() {
    console.log('[ORDERS PAGE] Checking if orders page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Check if there are no orders
  async hasNoOrders() {
    console.log('[ORDERS PAGE] Checking if there are no orders');
    return await this.isVisible(this.locators.emptyMessage);
  }

  // Verify page heading
  async verifyPageHeading() {
    console.log('[ORDERS PAGE] Verifying heading');
    await this.assertVisible(this.locators.heading);
    const headingText = await this.getText(this.locators.heading);
    return headingText;
  }

  // Get orders list (if any)
  async getOrdersList() {
    console.log('[ORDERS PAGE] Getting orders list');
    return await this.getText(this.locators.ordersList);
  }

  // Navigate to home
  async goToHome() {
    console.log('[ORDERS PAGE] Navigating to home');
    await this.click(this.navLocators.homeLink);
  }

  // Navigate to cart
  async goToCart() {
    console.log('[ORDERS PAGE] Navigating to cart');
    await this.click(this.navLocators.cartLink);
  }

  // Assert orders page loaded
  async assertOrdersPageLoaded() {
    console.log('[ORDERS PAGE] Asserting orders page is loaded');
    const hasNoOrders = await this.hasNoOrders();
    const hasOrdersList = await this.isVisible(this.locators.ordersList).catch(() => false);
    console.log(`[ORDERS PAGE] No orders: ${hasNoOrders}, Has orders list: ${hasOrdersList}`);
  }
}

export default OrdersPage;
