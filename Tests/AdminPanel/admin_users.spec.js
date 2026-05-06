import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminUsersPage } from '../../Pages/AdminPanel/AdminUsersPage';

test.describe('Admin User Directory @admin', () => {
    let usersPage;

    test.beforeEach(async ({ page }, testInfo) => {
        usersPage = new AdminUsersPage(page);
        await usersPage.skipOnRetry(testInfo);
        await usersPage.goto();
    });

    test('Should verify user directory table visibility', async ({ page }) => {
        const userCount = await usersPage.getUserCount();
        expect(userCount).toBeGreaterThan(0);
        
        const details = await usersPage.getUserDetails(0);
        expect(details.name).not.toBeNull();
        expect(details.email).toContain('@');
    });

    test('Should verify user directory table structure', async ({ page }) => {
        const headerLocator = page.locator('thead th');
        await expect(headerLocator).toContainText(['Name', 'Email', 'Role']);
    });
});
