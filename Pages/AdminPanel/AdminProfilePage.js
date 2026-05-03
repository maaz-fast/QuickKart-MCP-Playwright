export class AdminProfilePage {
    constructor(page) {
        this.page = page;
        this.nameInput = page.locator('input#name');
        this.emailInput = page.locator('input#email');
        this.passwordInput = page.locator('input[placeholder="Enter new password"]');
        this.confirmPasswordInput = page.locator('input[placeholder="Confirm new password"]');
        this.saveBtn = page.locator('button:has-text("Save Profile")');
        this.photoUpload = page.locator('input[type="file"]');
    }

    async goto() {
        await this.page.goto('https://quickkart-shop-nine.vercel.app/profile');
    }

    async updateName(newName) {
        await this.nameInput.fill(newName);
        await this.saveBtn.click();
    }

    async updatePassword(newPassword) {
        await this.passwordInput.fill(newPassword);
        await this.confirmPasswordInput.fill(newPassword);
        await this.saveBtn.click();
    }

    async isEmailReadOnly() {
        return await this.emailInput.isDisabled();
    }
}
