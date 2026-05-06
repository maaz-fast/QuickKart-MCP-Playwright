import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/admin.json');

setup('authenticate as admin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    console.log('[SETUP] Starting Admin authentication...');
    await loginPage.goto();
    await loginPage.login('maaz+admin@gmail.com', '123456');
    
    // Ensure we are redirected to the dashboard
    await expect(page).toHaveURL(/.*admin\/dashboard/);
    console.log('[SETUP] Admin authenticated successfully');
    
    // Save storage state
    await page.context().storageState({ path: authFile });
    console.log(`[SETUP] Auth state saved to: ${authFile}`);
});
