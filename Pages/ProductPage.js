// ProductPage - Handles product details functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.productPage;
    this.navLocators = locators.navigation;
  }

  // Check if product page is visible
  async isProductPageVisible() {
    console.log('[PRODUCT PAGE] Checking if product page is visible');
    return await this.isVisible(this.locators.productName);
  }

  // Get product name
  async getProductName() {
    console.log('[PRODUCT PAGE] Getting product name');
    return await this.getText(this.locators.productName);
  }

  // Get product price
  async getProductPrice() {
    console.log('[PRODUCT PAGE] Getting product price');
    const priceText = await this.getText(this.locators.productPrice);
    // Extract number from price string (e.g., "$190.00" -> 190.00)
    const match = priceText.match(/\$([0-9]+\.[0-9]{2})/);
    return match ? parseFloat(match[1]) : null;
  }

  // Get product description
  async getProductDescription() {
    console.log('[PRODUCT PAGE] Getting product description');
    return await this.getText(this.locators.productDescription);
  }

  // Get stock info
  async getStockInfo() {
    console.log('[PRODUCT PAGE] Getting stock info');
    return await this.getText(this.locators.stockIndicator);
  }

  // Increase quantity
  async increaseQuantity() {
    console.log('[PRODUCT PAGE] Increasing quantity');
    await this.click(this.locators.incrementButton);
  }

  // Decrease quantity
  async decreaseQuantity() {
    console.log('[PRODUCT PAGE] Decreasing quantity');
    await this.click(this.locators.decrementButton);
  }

  // Get current quantity
  async getQuantity() {
    console.log('[PRODUCT PAGE] Getting quantity');
    const qtyText = await this.getText(this.locators.quantityInput);
    return parseInt(qtyText);
  }

  // Set quantity (increase or decrease to reach target)
  async setQuantity(targetQty) {
    console.log(`[PRODUCT PAGE] Setting quantity to ${targetQty}`);
    const currentQty = parseInt(await this.getQuantity());
    
    if (currentQty < targetQty) {
      for (let i = currentQty; i < targetQty; i++) {
        await this.increaseQuantity();
      }
    } else if (currentQty > targetQty) {
      for (let i = currentQty; i > targetQty; i--) {
        await this.decreaseQuantity();
      }
    }
  }

  // Click add to cart button
  async clickAddToCartButton() {
    console.log('[PRODUCT PAGE] Clicking add to cart button');
    await this.click(this.locators.addToCartButton);
  }

  // Add product to cart
  async addToCart(quantity = 1) {
    console.log(`[PRODUCT PAGE] Adding product to cart (qty: ${quantity})`);
    await this.setQuantity(quantity);
    await this.clickAddToCartButton();
    
    // Wait for success notification
    await this.sleep(1000);
  }

  // Click add to wishlist button
  async clickAddToWishlistButton() {
    console.log('[PRODUCT PAGE] Clicking add to wishlist button');
    await this.click(this.locators.addToWishlistButton);
  }

  // Add product to wishlist
  async addToWishlist() {
    console.log('[PRODUCT PAGE] Adding product to wishlist');
    await this.clickAddToWishlistButton();
    await this.sleep(1000);
  }

  // Go back using breadcrumb
  async goBack() {
    console.log('[PRODUCT PAGE] Going back via breadcrumb');
    await this.click(this.locators.breadcrumb);
  }

  // Assert product name is visible
  async assertProductNameVisible() {
    console.log('[PRODUCT PAGE] Asserting product name is visible');
    await this.assertVisible(this.locators.productName);
  }

  // Assert product price is visible
  async assertProductPriceVisible() {
    console.log('[PRODUCT PAGE] Asserting product price is visible');
    await this.assertVisible(this.locators.productPrice);
  }

  // Assert product description is visible
  async assertProductDescriptionVisible() {
    console.log('[PRODUCT PAGE] Asserting product description is visible');
    await this.assertVisible(this.locators.productDescription);
  }

  // Assert add to cart button is visible
  async assertAddToCartButtonVisible() {
    console.log('[PRODUCT PAGE] Asserting add to cart button is visible');
    await this.assertVisible(this.locators.addToCartButton);
  }

  // Assert stock indicator is visible
  async assertStockIndicatorVisible() {
    console.log('[PRODUCT PAGE] Asserting stock indicator is visible');
    await this.assertVisible(this.locators.stockIndicator);
  }

  // Navigate to home
  async goToHome() {
    console.log('[PRODUCT PAGE] Navigating to home');
    await this.click(this.navLocators.homeLink);
  }

  // Navigate to cart
  async goToCart() {
    console.log('[PRODUCT PAGE] Navigating to cart');
    await this.click(this.navLocators.cartLink);
  }
}

export default ProductPage;
