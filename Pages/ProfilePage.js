// ProfilePage - Handles user profile functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.profilePage;
    this.navLocators = locators.navigation;
  }

  // Navigate to profile
  async goto() {
    console.log('[PROFILE PAGE] Navigating to profile page');
    await this.page.goto('/profile');
    await this.waitForLoadingToFinish();
  }

  // Check if profile page is visible
  async isProfilePageVisible() {
    console.log('[PROFILE PAGE] Checking if profile page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Verify page heading
  async verifyPageHeading() {
    console.log('[PROFILE PAGE] Verifying heading');
    await this.assertVisible(this.locators.heading);
    const headingText = await this.getText(this.locators.heading);
    return headingText;
  }

  // Get user info (if available)
  async getUserInfo() {
    console.log('[PROFILE PAGE] Getting user info');
    return await this.getText(this.locators.userInfo);
  }

  // Navigate to home
  async goToHome() {
    console.log('[PROFILE PAGE] Navigating to home');
    await this.click(this.navLocators.homeLink);
  }

  // Navigate to orders
  async goToOrders() {
    console.log('[PROFILE PAGE] Navigating to orders');
    await this.click(this.navLocators.ordersLink);
  }

  // Logout
  async logout() {
    console.log('[PROFILE PAGE] Logging out');
    await this.click(this.navLocators.logoutButton);
  }

  // Assert profile page loaded
  async assertProfilePageLoaded() {
    console.log('[PROFILE PAGE] Asserting profile page is loaded');
    await this.assertVisible(this.locators.userInfo);
  }

  // Upload profile picture
  async uploadProfilePicture(filePath) {
    console.log(`[PROFILE PAGE] Uploading profile picture from: ${filePath}`);
    const fileInput = this.page.locator(this.locators.profileImageInput.primary);
    
    // Set file input
    await fileInput.setInputFiles(filePath);
    
    // Wait for "Uploading" state
    console.log('[PROFILE PAGE] Waiting for "Uploading" indicator...');
    await this.page.waitForSelector(this.locators.uploadingIndicator.primary, { state: 'visible', timeout: 5000 }).catch(() => {
        console.log('[PROFILE PAGE] Warning: "Uploading" indicator did not appear');
    });
    
    // Wait for "Uploading" state to disappear
    await this.page.waitForSelector(this.locators.uploadingIndicator.primary, { state: 'hidden', timeout: 15000 });
    
    console.log('[PROFILE PAGE] Upload completed');
  }
}

export default ProfilePage;
