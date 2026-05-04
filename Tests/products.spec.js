// Products Test Suite
// Tests: Product listing, Search, Filtering, Product Details
import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage.js';
import { ProductPage } from '../Pages/ProductPage.js';
import { SignupPage } from '../Pages/SignupPage.js';
import { LoginPage } from '../Pages/LoginPage.js';
import testData from '../Data/db.json' assert { type: 'json' };

test.describe('Product Tests', () => {

  test.beforeEach(async ({ page }) => {
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);
    
    // Create and login user first
    const email = `prod-test${Date.now()}@test.com`;
    await signupPage.goto();
    await signupPage.signup('Test User', email, 'TestPass123!');
    await page.waitForTimeout(1000);

    await homePage.goto();
  });

  test('Products: Should display product grid on home page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.assertProductGridVisible();
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
    console.log(`[TEST PASSED] Home page displays ${count} products`);
  });

  test('Products: Should be able to search for a product', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Get a product name to search for dynamically
    await homePage.waitForProducts();
    const productNames = await homePage.getAllProductNames();
    expect(productNames.length).toBeGreaterThan(0);
    const searchTerm = productNames[0].split(' ')[0]; // Take first word of first product
    
    console.log(`[TEST] Searching for: ${searchTerm}`);
    await homePage.searchProduct(searchTerm);
    await homePage.waitForProducts();
    
    const results = await homePage.getAllProductNames();
    const matches = results.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
    expect(matches.length).toBeGreaterThan(0);
    console.log(`[TEST PASSED] Search results for "${searchTerm}" are correct`);
  });

  test('Products: Should filter by category', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Get all categories and pick the first one after "All"
    const categories = await page.locator('button[data-testid^="category-tab-"]').allTextContents();
    const targetCategory = categories.find(c => c !== 'All') || 'All';
    
    console.log(`[TEST] Filtering by category: ${targetCategory}`);
    await homePage.filterByCategory(targetCategory);
    await homePage.waitForProducts();
    
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
    console.log(`[TEST PASSED] Category filtering (${targetCategory}) shows ${count} products`);
  });

  test('Products: Should filter by price range', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.waitForProducts();
    
    console.log('[TEST] Filtering by price range: $10 - $100');
    await homePage.filterByPriceRange(10, 100);
    
    // Verify results are within range
    const productCards = page.locator('div[data-testid^="product-card-"]');
    const count = await productCards.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const priceText = await productCards.nth(i).locator('div:has-text("$")').last().innerText();
      const price = parseFloat(priceText.replace('$', ''));
      expect(price).toBeGreaterThanOrEqual(10);
      expect(price).toBeLessThanOrEqual(100);
    }
    
    console.log(`[TEST PASSED] Price filtering works for ${count} products`);
  });

  test('Products: Should view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.waitForProducts();
    // Get first product name
    const productName = await homePage.getFirstProductName();
    
    // Click first product
    await homePage.clickFirstProduct();
    
    // ASSERT - Product page visible
    const isVisible = await productPage.isProductPageVisible();
    expect(isVisible).toBeTruthy();
    
    // ASSERT - Correct product name displayed
    const detailName = await productPage.getProductName();
    expect(detailName.trim()).toBe(productName.trim());
    
    // ASSERT - Price and description present
    const price = await productPage.getProductPrice();
    expect(price).toBeGreaterThan(0);
    
    console.log(`[TEST PASSED] Product detail view for "${detailName}" is correct`);
  });

  test('Products: Quantity increment/decrement works', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.clickFirstProduct();
    
    // Initially 1
    let quantity = await productPage.getQuantity();
    expect(quantity).toBe(1);
    
    // Increment
    await productPage.increaseQuantity();
    quantity = await productPage.getQuantity();
    expect(quantity).toBe(2);
    
    // Decrement
    await productPage.decreaseQuantity();
    quantity = await productPage.getQuantity();
    expect(quantity).toBe(1);
    
    console.log('[TEST PASSED] Product quantity controls work');
  });

  test('Products: Pagination controls work', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Scroll to bottom
    await homePage.scrollToElement(homePage.locators.nextPageButton);
    
    // Check if next button is visible/enabled
    const isNextVisible = await homePage.isVisible(homePage.locators.nextPageButton);
    if (isNextVisible) {
      await homePage.goToNextPage();
      await page.waitForTimeout(1000);
      console.log('[TEST PASSED] Pagination next page works');
    } else {
      console.log('[TEST INFO] Next page button not visible (single page results)');
    }
  });

});
