import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminCategoriesPage } from '../../Pages/AdminPanel/AdminCategoriesPage';

test.describe('Admin Category Management @admin', () => {
    let categoriesPage;

    test.beforeEach(async ({ page }, testInfo) => {
        categoriesPage = new AdminCategoriesPage(page);
        await categoriesPage.skipOnRetry(testInfo);
        page.on('dialog', dialog => dialog.accept());
        await categoriesPage.goto();
        await categoriesPage.cleanupPageState();
    });

    test('Should add and delete a category', async ({ page }) => {
        const categoryName = `AAA New Cat ${Date.now()}`;
        
        // Add Category
        await categoriesPage.addCategory(categoryName);
        
        // Verify in list
        await expect(categoriesPage.tableRows.filter({ hasText: categoryName })).toBeVisible();
        
        // Delete Category
        await categoriesPage.deleteCategory(categoryName);
        
        // Verify removed
        await expect(page.locator(`text=${categoryName}`)).not.toBeVisible();
    });
});
