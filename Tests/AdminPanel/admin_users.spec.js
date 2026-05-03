import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminUsersPage } from '../../Pages/AdminPanel/AdminUsersPage';

test.describe('Admin User Directory', () => {
    let loginPage;
    let usersPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        usersPage = new AdminUsersPage(page);

        await loginPage.goto();
        await loginPage.login('maaz+admin@gmail.com', '123456');
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
        const headers = await page.locator('thead th').allInnerTexts();
        expect(headers).toContain('Name');
        expect(headers).toContain('Email');
        expect(headers).toContain('Role');
    });
});
