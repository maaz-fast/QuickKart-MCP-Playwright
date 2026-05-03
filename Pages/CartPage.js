// CartPage - Handles cart functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.cartPage;
    this.navLocators = locators.navigation;
  }

  // Navigate to cart
  async goto() {
    console.log('[CART PAGE] Navigating to cart page');
    await this.page.goto('/cart');
    await this.waitForLoadingToFinish();
  }

  // Check if cart page is visible
  async isCartPageVisible() {
    console.log('[CART PAGE] Checking if cart page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Check if cart is empty
  async isCartEmpty() {
    console.log('[CART PAGE] Checking if cart is empty');
    return await this.isVisible(this.locators.emptyMessage);
  }

  // Get subtotal
  async getSubtotal() {
    console.log('[CART PAGE] Getting subtotal');
    const subtotalText = await this.getText(this.locators.subtotalValue);
    const match = subtotalText.match(/\$([0-9]+\.[0-9]{2})/);
    return match ? parseFloat(match[1]) : 0;
  }

  // Get shipping cost
  async getShipping() {
    console.log('[CART PAGE] Getting shipping cost');
    const shippingText = await this.getText(this.locators.shippingValue);
    if (shippingText.includes('FREE')) return 0;
    const match = shippingText.match(/\$([0-9]+\.[0-9]{2})/);
    return match ? parseFloat(match[1]) : 0;
  }

  // Get tax
  async getTax() {
    console.log('[CART PAGE] Getting tax');
    const taxText = await this.getText(this.locators.taxValue);
    const match = taxText.match(/\$([0-9]+\.[0-9]{2})/);
    return match ? parseFloat(match[1]) : 0;
  }

  // Get total
  async getTotal() {
    console.log('[CART PAGE] Getting total');
    const totalText = await this.getText(this.locators.totalValue);
    const match = totalText.match(/\$([0-9]+\.[0-9]{2})/);
    return match ? parseFloat(match[1]) : 0;
  }

  // Verify order summary
  async verifyOrderSummary() {
    console.log('[CART PAGE] Verifying order summary');
    const subtotal = await this.getSubtotal();
    const shipping = await this.getShipping();
    const tax = await this.getTax();
    const total = await this.getTotal();
    
    const expectedTotal = subtotal + shipping + tax;
    console.log(`[CART PAGE] Subtotal: $${subtotal}, Shipping: $${shipping}, Tax: $${tax}, Total: $${total}`);
    console.log(`[CART PAGE] Expected Total: $${expectedTotal}`);
    
    return Math.abs(total - expectedTotal) < 0.01; // Allow for rounding
  }

  // Get cart item count
  async getCartItemCount() {
    console.log('[CART PAGE] Getting cart item count');
    const itemElements = await this.page.locator(this.locators.cartItems.primary).count();
    return itemElements;
  }

  // Remove item from cart
  async removeItemFromCart() {
    console.log('[CART PAGE] Removing item from cart');
    await this.click(this.locators.removeButton);
    await this.sleep(1000);
  }

  // Click proceed to checkout
  async clickProceedToCheckout() {
    console.log('[CART PAGE] Clicking proceed to checkout button');
    await this.click(this.locators.proceedToCheckoutButton);
  }

  // Proceed to checkout
  async proceedToCheckout() {
    console.log('[CART PAGE] Proceeding to checkout');
    await this.click(this.locators.proceedToCheckoutButton);
    await this.page.waitForURL('**/checkout');
  }

  // Click continue shopping
  async clickContinueShopping() {
    console.log('[CART PAGE] Clicking continue shopping button');
    await this.click(this.locators.continueShoppingButton);
  }

  // Continue shopping (go back to home)
  async continueShopping() {
    console.log('[CART PAGE] Continuing shopping');
    await this.clickContinueShopping();
    await this.page.waitForURL('**/', { waitUntil: 'networkidle' });
  }

  // Assert subtotal is visible
  async assertSubtotalVisible() {
    console.log('[CART PAGE] Asserting subtotal is visible');
    await this.assertVisible(this.locators.subtotalValue);
  }

  // Assert total is visible
  async assertTotalVisible() {
    console.log('[CART PAGE] Asserting total is visible');
    await this.assertVisible(this.locators.totalValue);
  }

  // Assert proceed to checkout button is visible
  async assertProceedToCheckoutVisible() {
    console.log('[CART PAGE] Asserting proceed to checkout button is visible');
    await this.assertVisible(this.locators.proceedToCheckoutButton);
  }

  // Navigate to home
  async goToHome() {
    console.log('[CART PAGE] Navigating to home');
    await this.click(this.navLocators.homeLink);
  }
}

export default CartPage;
