// WishlistPage - Handles wishlist functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class WishlistPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.wishlistPage;
    this.navLocators = locators.navigation;
  }

  // Navigate to wishlist
  async goto() {
    console.log('[WISHLIST PAGE] Navigating to wishlist page');
    await this.page.goto('/wishlist');
  }

  // Check if wishlist page is visible
  async isWishlistPageVisible() {
    console.log('[WISHLIST PAGE] Checking if wishlist page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Check if wishlist is empty
  async isWishlistEmpty() {
    console.log('[WISHLIST PAGE] Checking if wishlist is empty');
    return await this.isVisible(this.locators.emptyMessage);
  }

  // Verify page heading
  async verifyPageHeading() {
    console.log('[WISHLIST PAGE] Verifying heading');
    await this.assertVisible(this.locators.heading);
    const headingText = await this.getText(this.locators.heading);
    return headingText;
  }

  // Click explore products button
  async clickExploreButton() {
    console.log('[WISHLIST PAGE] Clicking explore products button');
    await this.click(this.locators.exploreButton);
  }

  // Navigate to home
  async goToHome() {
    console.log('[WISHLIST PAGE] Navigating to home');
    await this.click(this.navLocators.homeLink);
  }

  // Navigate to cart
  async goToCart() {
    console.log('[WISHLIST PAGE] Navigating to cart');
    await this.click(this.navLocators.cartLink);
  }

  // Assert wishlist page loaded
  async assertWishlistPageLoaded() {
    console.log('[WISHLIST PAGE] Asserting wishlist page is loaded');
    await this.assertVisible(this.locators.heading);
  }
}

export default WishlistPage;
