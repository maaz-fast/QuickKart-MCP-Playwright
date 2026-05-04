import BasePage from '../BasePage.js';

export class AdminProfilePage extends BasePage {
    constructor(page) {
        super(page);
        this.nameInput = page.locator('input#name');
        this.emailInput = page.locator('input#email');
        this.passwordInput = page.locator('input[placeholder="Enter new password"]');
        this.confirmPasswordInput = page.locator('input[placeholder="Confirm new password"]');
        this.saveBtn = page.locator('button:has-text("Save Profile")');
        this.photoUpload = page.locator('input[type="file"]');
    }

    async goto() {
        await this.page.goto('/profile');
        await this.waitForLoadingToFinish();
    }

    async updateName(newName) {
        await this.fill(this.nameInput, newName);
        await this.click(this.saveBtn);
    }

    async updatePassword(newPassword) {
        await this.fill(this.passwordInput, newPassword);
        await this.fill(this.confirmPasswordInput, newPassword);
        await this.click(this.saveBtn);
    }

    async isEmailReadOnly() {
        return await this.emailInput.isDisabled();
    }

    async uploadProfilePicture(filePath) {
        console.log(`[ADMIN PROFILE] Uploading profile picture from: ${filePath}`);
        
        // Set file input
        await this.photoUpload.setInputFiles(filePath);
        
        // Wait for "Uploading" state
        console.log('[ADMIN PROFILE] Waiting for "Uploading" indicator...');
        await this.page.waitForSelector('text="Uploading"', { state: 'visible', timeout: 5000 }).catch(() => {
            console.log('[ADMIN PROFILE] Warning: "Uploading" indicator did not appear');
        });
        
        // Wait for "Uploading" state to disappear
        await this.page.waitForSelector('text="Uploading"', { state: 'hidden', timeout: 15000 });
        
        console.log('[ADMIN PROFILE] Upload completed');
    }
}
