import { test, expect } from '@playwright/test';
import { ContactPage } from '../Pages/ContactPage';

// We are testing the "Contact Us" form to make sure users can actually reach out for support
test.describe('Contact Form Tests @contact', () => {
    let contactPage;

    // Before every single test, we need to set up our page and navigate to the contact URL
    test.beforeEach(async ({ page }) => {
        // We initialize the Contact Page object to use its helper functions
        contactPage = new ContactPage(page);
        // We tell the browser to go directly to the /contact page
        await contactPage.goto();
    });

    // Test 1: Making sure a perfectly filled form actually goes through
    test('Should submit contact form with valid data', async ({ page }) => {
        // This is the "perfect" data we'll use for this successful submission
        const testData = {
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Support Request',
            message: 'This is an automated test message for contact form.'
        };

        // We use our page object to fill everything out and click the send button in one go
        await contactPage.submitContactForm(
            testData.name,
            testData.email,
            testData.subject,
            testData.message
        );

        // After clicking send, we expect to see the beautiful "Message Received!" confirmation screen
        await expect(page.locator('h2:has-text("Message Received!")')).toBeVisible();
        // We also check for the friendly "thank you" text to ensure the user feels acknowledged
        await expect(page.locator('text=Thank you for reaching out')).toBeVisible();
        // Finally, we make sure the "Send Another" button is there if they have more to say
        await expect(page.locator('button:has-text("Send Another Message")')).toBeVisible();
    });

    // Test 2: Checking if the form correctly stops us if we leave everything blank
    test('Should display validation errors for empty fields', async ({ page }) => {
        // We try to click "Send Message" without typing a single letter
        await contactPage.clickSendMessageButton();

        // Now we check if the app tells us EXACTLY what we missed (name, email, subject, and message)
        await expect(page.locator(contactPage.locators.errorMessages.name)).toBeVisible();
        await expect(page.locator(contactPage.locators.errorMessages.email)).toBeVisible();
        await expect(page.locator(contactPage.locators.errorMessages.subject)).toBeVisible();
        await expect(page.locator(contactPage.locators.errorMessages.message)).toBeVisible();
    });

    // Test 3: Making sure the app catches a "fake" or badly formatted email address
    test('Should display error for invalid email format', async ({ page }) => {
        // We fill everything correctly EXCEPT for the email address
        await contactPage.fillFullName('Test User');
        await contactPage.fillEmail('invalid-email'); // No @ or .com here!
        await contactPage.fillSubject('Test');
        await contactPage.fillMessage('Test');
        
        // We try to submit this bad data
        await contactPage.clickSendMessageButton();

        // We expect the app to catch the bad email and show the specific "valid email" error
        await expect(page.locator(contactPage.locators.errorMessages.invalidEmail)).toBeVisible();
    });

    // Test 4: Verifying that our official contact details are actually visible on the page
    test('Should verify support contact information', async ({ page }) => {
        // These are the official support details we expect to see
        const supportInfo = {
            email: 'support@quickkart.com',
            phone: '+92 300 1234567',
            location: '123 Tech Avenue, Karachi, Pakistan'
        };

        // We check the page to make sure our email, phone, and address are all there for the user
        await expect(page.locator(`text=${supportInfo.email}`)).toBeVisible();
        await expect(page.locator(`text=${supportInfo.phone}`)).toBeVisible();
        await expect(page.locator(`text=${supportInfo.location}`)).toBeVisible();
    });
});
