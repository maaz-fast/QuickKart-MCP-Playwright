import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminCategoriesPage } from '../../Pages/AdminPanel/AdminCategoriesPage';

test.describe('Admin Category Management @admin', () => {
    let categoriesPage;

    test.beforeEach(async ({ page }, testInfo) => {
        categoriesPage = new AdminCategoriesPage(page);
        await categoriesPage.skipOnRetry(testInfo);
        await categoriesPage.goto();
    });

    test('Should add and delete a category', async ({ page }) => {
        const categoryName = `New Cat ${Date.now()}`;
        
        // Add Category
        await categoriesPage.addCategory(categoryName);
        
        // Verify in list
        const categoryList = page.locator('tbody tr');
        await expect(categoryList).toContainText(categoryName);
        
        // Delete Category
        await categoriesPage.deleteCategory(categoryName);
        
        // Verify removed
        await expect(page.locator(`text=${categoryName}`)).not.toBeVisible();
    });
});
