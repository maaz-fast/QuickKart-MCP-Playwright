// HomePage - Handles home/product listing functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.homePage;
    this.navLocators = locators.navigation;
  }

  // Navigate to home
  async goto() {
    console.log('[HOME PAGE] Navigating to home page');
    await this.page.goto('/');
    // Wait for products-grid to signal it has finished loading
    try {
      await this.page.waitForSelector('div[data-testid="products-grid"][data-loading="false"]', { timeout: 20000 });
    } catch (e) {
      // Fallback: wait for any product card to appear
      try {
        await this.page.waitForSelector('div[data-testid^="product-card-"]', { timeout: 10000 });
      } catch {
        await this.page.waitForTimeout(3000);
      }
    }
  }

  // Wait for products to load
  async waitForProducts() {
    console.log('[HOME PAGE] Waiting for products to load...');
    // Wait for loading spinner to appear then disappear
    const spinner = this.page.locator(this.locators.loadingSpinner.primary);
    try {
      await spinner.waitFor({ state: 'visible', timeout: 2000 });
      await spinner.waitFor({ state: 'hidden', timeout: 15000 });
    } catch (e) {
      // Spinner might have already been gone
    }
    
    // Wait for either the grid or the empty state to appear
    await Promise.race([
        this.page.waitForSelector(this.locators.productGrid.primary, { state: 'visible', timeout: 10000 }),
        this.page.waitForSelector('[data-testid="no-products-state"]', { state: 'visible', timeout: 10000 })
    ]).catch(() => {
        console.log('[HOME PAGE] Warning: Neither product grid nor empty state appeared');
    });
  }

  // Check if home page is visible
  async isHomePageVisible() {
    console.log('[HOME PAGE] Checking if home page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Verify page heading
  async verifyPageHeading() {
    console.log('[HOME PAGE] Verifying heading');
    await this.assertVisible(this.locators.heading);
    const headingText = await this.getText(this.locators.heading);
    return headingText;
  }

  // Search for products
  async searchProducts(searchTerm) {
    console.log(`[HOME PAGE] Searching for: ${searchTerm}`);
    const searchInput = this.page.locator(this.locators.searchInput.primary);
    await searchInput.clear();
    await searchInput.pressSequentially(searchTerm, { delay: 100 });
    // Wait for debounce to potentially trigger
    await this.page.waitForTimeout(600);
  }

  // Convenience method for search
  async searchProduct(searchTerm) {
    await this.searchProducts(searchTerm);
  }

  // Click category button
  async selectCategory(categoryName) {
    console.log(`[HOME PAGE] Selecting category: ${categoryName}`);
    // Handle "All" specially if needed or just use text
    const categoryButton = `button:has-text("${categoryName}")`;
    await this.click(categoryButton);
  }

  // Convenience method for filtering
  async filterByCategory(categoryName) {
    await this.selectCategory(categoryName);
  }

  // Click All category
  async clickAllCategory() {
    console.log('[HOME PAGE] Clicking All category');
    await this.click(this.locators.allCategoryButton);
  }

  // Get first product card
  async getFirstProductCard() {
    console.log('[HOME PAGE] Getting first product card');
    const cards = this.page.locator(this.locators.productCard.primary);
    return cards.first();
  }

  // Get product card by index
  async getProductCard(index = 0) {
    const cards = this.page.locator(this.locators.productCard.primary);
    return cards.nth(index);
  }

  // Click first product
  async clickFirstProduct() {
    console.log('[HOME PAGE] Clicking first product');
    const card = await this.getFirstProductCard();
    // In React app, the image or title is usually the click target for details
    const image = card.locator('img');
    await image.click();
  }

  // Add product to cart with synchronization
  async addToCart(productIndex = 0) {
    console.log(`[HOME PAGE] Adding product at index ${productIndex} to cart`);
    const card = await this.getProductCard(productIndex);
    const addToCartBtn = card.locator(this.locators.addToCartButton);
    
    // Get initial cart count if possible
    let initialCount = 0;
    try {
      const badge = this.page.locator(this.navLocators.cartCountBadge.primary);
      if (await badge.isVisible()) {
        const text = await badge.innerText();
        initialCount = parseInt(text) || 0;
      }
    } catch (e) {
      // No badge yet or error reading
    }

    await addToCartBtn.click();
    
    // Wait for cart counter to appear or update
    console.log('[HOME PAGE] Waiting for cart counter to update...');
    const badgeLocator = this.page.locator(this.navLocators.cartCountBadge.primary);
    
    // Wait for badge to be visible and have text > initialCount
    await badgeLocator.waitFor({ state: 'visible', timeout: 10000 });
    
    // Additional wait to ensure state is settled in the backend/context
    await this.page.waitForTimeout(1000);
  }

  // Get first product name
  async getFirstProductName() {
    console.log('[HOME PAGE] Getting first product name');
    const names = await this.getAllProductNames();
    return names[0];
  }

  // Get all product names
  async getAllProductNames() {
    console.log('[HOME PAGE] Getting all product names');
    const nameLoc = this.page.locator(`${this.locators.productCard.primary} h3`);
    return await nameLoc.allTextContents();
  }

  // Click home link
  async goToHome() {
    console.log('[HOME PAGE] Navigating to home');
    await this.click(this.navLocators.homeLink);
  }

  // Click product by name
  async clickProductByName(productName) {
    console.log(`[HOME PAGE] Clicking product: ${productName}`);
    const productButton = `button:has-text("${productName}")`;
    await this.click(productButton);
  }

  // Click next page button
  async clickNextPage() {
    console.log('[HOME PAGE] Clicking next page');
    await this.click(this.locators.nextPageButton);
  }

  // Convenience method
  async goToNextPage() {
    await this.clickNextPage();
  }

  // Click previous page button
  async clickPreviousPage() {
    console.log('[HOME PAGE] Clicking previous page');
    await this.click(this.locators.previousPageButton);
  }

  // Navigate to cart
  async goToCart() {
    console.log('[HOME PAGE] Navigating to cart');
    await this.click(this.navLocators.cartLink);
  }

  // Navigate to orders
  async goToOrders() {
    console.log('[HOME PAGE] Navigating to orders');
    await this.click(this.navLocators.ordersLink);
  }

  // Navigate to wishlist
  async goToWishlist() {
    console.log('[HOME PAGE] Navigating to wishlist');
    await this.click(this.navLocators.wishlistLink);
  }

  // Navigate to profile
  async goToProfile() {
    console.log('[HOME PAGE] Navigating to profile');
    await this.click(this.navLocators.userProfileLink);
  }

  // Click logout
  async logout() {
    console.log('[HOME PAGE] Logging out');
    await this.click(this.navLocators.logoutButton);
    await this.page.waitForURL('**/login');
  }

  // Verify all navigation links are visible
  async assertNavigationVisible() {
    console.log('[HOME PAGE] Asserting navigation is visible');
    await this.assertVisible(this.navLocators.homeLink);
    await this.assertVisible(this.navLocators.contactLink);
    await this.assertVisible(this.navLocators.cartLink);
    await this.assertVisible(this.navLocators.logoutButton);
  }

  // Get product count
  async getProductCount() {
    console.log('[HOME PAGE] Getting product count');
    const count = await this.page.locator(this.locators.productCard.primary).count();
    console.log(`[HOME PAGE] Found ${count} products`);
    return count;
  }

  // Assert product grid is visible
  async assertProductGridVisible() {
    console.log('[HOME PAGE] Asserting product grid is visible');
    await this.assertVisible(this.locators.productGrid);
  }

  // Assert category buttons are visible
  async assertCategoryButtonsVisible() {
    console.log('[HOME PAGE] Asserting category buttons are visible');
    await this.assertVisible(this.locators.allCategoryButton);
  }

  // Click home link
  async clickHomeLink() {
    console.log('[HOME PAGE] Clicking home link');
    await this.click(this.navLocators.homeLink);
  }

  // Click contact link
  async clickContactLink() {
    console.log('[HOME PAGE] Clicking contact link');
    await this.click(this.navLocators.contactLink);
  }
}

export default HomePage;
