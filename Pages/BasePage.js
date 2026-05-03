// BasePage - Reusable base class with MCP healing support
// All page objects extend this class
// Includes retry logic with primary and fallback locators

import { expect } from '@playwright/test';
import locators from '../Locators/locators.js';

export class BasePage {
  // Constructor accepts page object from Playwright
  constructor(page) {
    this.page = page;
    this.timeout = 30000;
    this.retryAttempts = 2;
  }

  // ===================== LOCATOR RESOLUTION (MCP HEALING) =====================

  /**
   * Resolve a locator from the locators file
   * Tries primary first, then fallback if primary fails
   * This is the MCP healing mechanism
   */
  async resolveLocator(locatorPath) {
    // Split path like "loginPage.emailInput" to get nested value
    const parts = locatorPath.split('.');
    let locator = locators;
    
    for (const part of parts) {
      locator = locator[part];
    }

    return locator;
  }

  /**
   * Try primary locator, fallback to alternative if fails
   * This implements MCP healing strategy
   */
  async tryLocator(primary, fallback) {
    console.log(`[HEALING] Attempting primary selector: ${primary}`);
    try {
      await this.page.waitForSelector(primary, { timeout: 10000 });
      return primary;
    } catch (error) {
      // Primary locator failed, try fallback
      console.log(`[HEALING] Primary selector failed, trying fallback: ${fallback}`);
      try {
        await this.page.waitForSelector(fallback, { timeout: 10000 });
        return fallback;
      } catch (fallbackError) {
        console.error(`[HEALING FAILED] Both selectors failed. Primary: ${primary}, Fallback: ${fallback}`);
        throw fallbackError;
      }
    }
  }

  // ===================== CLICK ACTIONS =====================

  /**
   * Click an element using primary/fallback locators
   * Retries on failure
   */
  async click(locator, options = {}) {
    const selector = await this.getSelector(locator);
    
    for (let i = 0; i < this.retryAttempts; i++) {
      try {
        console.log(`[CLICK] Clicking: ${selector}`);
        await this.page.click(selector, options);
        return;
      } catch (error) {
        console.log(`[CLICK RETRY ${i + 1}/${this.retryAttempts}] Retrying click...`);
        if (i === this.retryAttempts - 1) throw error;
        await this.page.waitForTimeout(500);
      }
    }
  }

  /**
   * Safely get a selector with healing logic
   */
  async getSelector(locator) {
    if (typeof locator === 'string') {
      return locator; // Direct string selector
    }
    
    // Locator object with primary and fallback
    return await this.tryLocator(locator.primary, locator.fallback);
  }

  // ===================== TEXT INPUT ACTIONS =====================

  /**
   * Fill an input field
   * Clears existing text first
   */
  async fill(selector, text) {
    const resolvedSelector = await this.getSelector(selector);
    
    for (let i = 0; i < this.retryAttempts; i++) {
      try {
        console.log(`[FILL] Filling "${resolvedSelector}" with: "${text}"`);
        await this.page.fill(resolvedSelector, text);
        return;
      } catch (error) {
        console.log(`[FILL RETRY ${i + 1}/${this.retryAttempts}] Retrying fill...`);
        if (i === this.retryAttempts - 1) throw error;
        await this.page.waitForTimeout(500);
      }
    }
  }

  /**
   * Type text into an input (character by character)
   * Useful for fields with character-by-character validation
   */
  async type(selector, text, options = {}) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[TYPE] Typing into "${resolvedSelector}": "${text}"`);
    await this.page.click(resolvedSelector);
    await this.page.type(resolvedSelector, text, options);
  }

  /**
   * Clear input field
   */
  async clear(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[CLEAR] Clearing field: ${resolvedSelector}`);
    await this.page.fill(resolvedSelector, '');
  }

  // ===================== WAIT ACTIONS =====================

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector, timeout = this.timeout) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[WAIT] Waiting for element: ${resolvedSelector}`);
    await this.page.waitForSelector(resolvedSelector, { timeout });
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(options = {}) {
    const timeout = options.timeout || this.timeout;
    console.log('[WAIT] Waiting for navigation...');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for specific URL
   */
  async waitForURL(urlPattern, timeout = this.timeout) {
    console.log(`[WAIT] Waiting for URL: ${urlPattern}`);
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Wait for URL to contain text
   */
  async waitForURLContains(text, timeout = this.timeout) {
    console.log(`[WAIT] Waiting for URL to contain: ${text}`);
    await this.page.waitForFunction(
      (expectedText) => window.location.href.includes(expectedText),
      expectedText,
      { timeout }
    );
  }

  /**
   * Wait for specific timeout
   */
  async sleep(ms = 1000) {
    console.log(`[SLEEP] Waiting ${ms}ms...`);
    await this.page.waitForTimeout(ms);
  }

  // ===================== GET/ASSERTION ACTIONS =====================

  /**
   * Get text content of an element
   */
  async getText(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[GET TEXT] From: ${resolvedSelector}`);
    const text = await this.page.textContent(resolvedSelector);
    return text?.trim() || '';
  }

  /**
   * Get input value
   */
  async getInputValue(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[GET VALUE] From: ${resolvedSelector}`);
    return await this.page.inputValue(resolvedSelector);
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector) {
    try {
      const resolvedSelector = await this.getSelector(selector);
      const isVisible = await this.page.isVisible(resolvedSelector);
      console.log(`[VISIBILITY] ${resolvedSelector}: ${isVisible}`);
      return isVisible;
    } catch (error) {
      console.log(`[VISIBILITY] Element not found or not visible`);
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[ENABLED] Checking: ${resolvedSelector}`);
    return await this.page.isEnabled(resolvedSelector);
  }

  /**
   * Get current page URL
   */
  async getCurrentURL() {
    const url = this.page.url();
    console.log(`[CURRENT URL] ${url}`);
    return url;
  }

  /**
   * Get page title
   */
  async getPageTitle() {
    const title = await this.page.title();
    console.log(`[PAGE TITLE] ${title}`);
    return title;
  }

  /**
   * Check if element has specific attribute value
   */
  async hasAttribute(selector, attribute, value) {
    const resolvedSelector = await this.getSelector(selector);
    
    const attrValue = await this.page.getAttribute(resolvedSelector, attribute);
    return attrValue === value;
  }

  /**
   * Get attribute value
   */
  async getAttribute(selector, attribute) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[GET ATTR] ${attribute} from: ${resolvedSelector}`);
    return await this.page.getAttribute(resolvedSelector, attribute);
  }

  // ===================== NAVIGATION =====================

  /**
   * Navigate to a URL
   */
  async goto(url) {
    console.log(`[NAVIGATE] Going to: ${url}`);
    await this.page.goto(url);
    await this.waitForNavigation();
  }

  /**
   * Go back in browser history
   */
  async goBack() {
    console.log('[NAVIGATE] Going back...');
    await this.page.goBack();
    await this.waitForNavigation();
  }

  /**
   * Refresh page
   */
  async refresh() {
    console.log('[NAVIGATE] Refreshing page...');
    await this.page.reload();
    await this.waitForNavigation();
  }

  // ===================== ASSERTIONS =====================

  /**
   * Assert element is visible
   */
  async assertVisible(selector, message = '') {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[ASSERT] Element visible: ${resolvedSelector}`);
    await expect(this.page.locator(resolvedSelector)).toBeVisible();
  }

  /**
   * Assert element is hidden
   */
  async assertHidden(selector, message = '') {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[ASSERT] Element hidden: ${resolvedSelector}`);
    await expect(this.page.locator(resolvedSelector)).toBeHidden();
  }

  /**
   * Assert text content
   */
  async assertTextContains(selector, expectedText) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[ASSERT] Text contains "${expectedText}" in: ${resolvedSelector}`);
    await expect(this.page.locator(resolvedSelector)).toContainText(expectedText);
  }

  /**
   * Assert exact text match
   */
  async assertTextEquals(selector, expectedText) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[ASSERT] Text equals "${expectedText}" in: ${resolvedSelector}`);
    await expect(this.page.locator(resolvedSelector)).toHaveText(expectedText);
  }

  /**
   * Assert page URL
   */
  async assertURLContains(expectedURL) {
    console.log(`[ASSERT] URL contains: ${expectedURL}`);
    await expect(this.page).toHaveURL(new RegExp(expectedURL));
  }

  /**
   * Assert input value
   */
  async assertInputValue(selector, expectedValue) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[ASSERT] Input value: "${expectedValue}"`);
    await expect(this.page.locator(resolvedSelector)).toHaveValue(expectedValue);
  }

  /**
   * Assert element is enabled
   */
  async assertEnabled(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[ASSERT] Element enabled: ${resolvedSelector}`);
    await expect(this.page.locator(resolvedSelector)).toBeEnabled();
  }

  /**
   * Assert element is disabled
   */
  async assertDisabled(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[ASSERT] Element disabled: ${resolvedSelector}`);
    await expect(this.page.locator(resolvedSelector)).toBeDisabled();
  }

  /**
   * Assert page title
   */
  async assertPageTitle(expectedTitle) {
    console.log(`[ASSERT] Page title: ${expectedTitle}`);
    await expect(this.page).toHaveTitle(new RegExp(expectedTitle));
  }

  // ===================== ADVANCED INTERACTIONS =====================

  /**
   * Select option from dropdown
   */
  async selectDropdownOption(selector, value) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[SELECT] Selecting "${value}" from: ${resolvedSelector}`);
    await this.page.selectOption(resolvedSelector, value);
  }

  /**
   * Check a checkbox
   */
  async checkCheckbox(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[CHECK] Checking: ${resolvedSelector}`);
    await this.page.check(resolvedSelector);
  }

  /**
   * Uncheck a checkbox
   */
  async uncheckCheckbox(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[UNCHECK] Unchecking: ${resolvedSelector}`);
    await this.page.uncheck(resolvedSelector);
  }

  /**
   * Double click element
   */
  async doubleClick(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[DOUBLE CLICK] On: ${resolvedSelector}`);
    await this.page.dblclick(resolvedSelector);
  }

  /**
   * Hover over element
   */
  async hover(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[HOVER] Over: ${resolvedSelector}`);
    await this.page.hover(resolvedSelector);
  }

  /**
   * Press keyboard key
   */
  async pressKey(key) {
    console.log(`[KEY PRESS] Key: ${key}`);
    await this.page.press('body', key);
  }

  /**
   * Get all text from multiple elements
   */
  async getAllText(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[GET ALL TEXT] From: ${resolvedSelector}`);
    const texts = await this.page.locator(resolvedSelector).allTextContents();
    return texts.map(t => t.trim());
  }

  /**
   * Scroll to element
   */
  async scrollToElement(selector) {
    const resolvedSelector = await this.getSelector(selector);
    
    console.log(`[SCROLL] To element: ${resolvedSelector}`);
    await this.page.locator(resolvedSelector).scrollIntoViewIfNeeded();
  }

  /**
   * Screenshot for debugging
   */
  async takeScreenshot(filename = 'screenshot') {
    console.log(`[SCREENSHOT] Taking: ${filename}.png`);
    await this.page.screenshot({ 
      path: `./screenshots/${filename}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  // ===================== PAGE STATE =====================

  /**
   * Check if page has loaded
   */
  async pageIsReady() {
    console.log('[PAGE READY] Waiting for page to be ready...');
    await this.page.waitForLoadState('networkidle');
    await this.waitForLoadingToFinish();
    return true;
  }

  /**
   * Wait for any loading spinner/skeleton to disappear
   * Targets the standardized "page-loader" testId used by BrandedLoader across all pages
   */
  async waitForLoadingToFinish(timeout = 15000) {
    try {
      console.log('[WAIT] Waiting for loaders to finish...');
      // First try the standardized page-loader testId
      await this.page.waitForSelector('[data-testid="page-loader"]', { state: 'hidden', timeout: 5000 });
    } catch (e) {
      // Fallback: wait for any loading-related testid (covers skeleton cards etc.)
      try {
        await this.page.waitForSelector('[data-testid*="loading"]', { state: 'hidden', timeout });
      } catch {
        // Loader might not have appeared or already gone — continue
      }
    }
  }

  /**
   * Get page response status
   */
  async getResponseStatus(timeout = this.timeout) {
    console.log('[RESPONSE] Waiting for response...');
    const response = await this.page.waitForResponse(
      response => response.status() === 200,
      { timeout }
    );
    return response.status();
  }
}

export default BasePage;
