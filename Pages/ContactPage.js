// ContactPage - Handles contact form functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class ContactPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.contactPage;
  }

  // Navigate to contact page
  async goto() {
    console.log('[CONTACT PAGE] Navigating to contact page');
    await this.page.goto('/contact');
  }

  // Check if contact page is visible
  async isContactPageVisible() {
    console.log('[CONTACT PAGE] Checking if page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Verify page heading
  async verifyPageHeading() {
    console.log('[CONTACT PAGE] Verifying heading');
    await this.assertVisible(this.locators.heading);
    const headingText = await this.getText(this.locators.heading);
    return headingText;
  }

  // Fill full name field
  async fillFullName(fullName) {
    console.log(`[CONTACT PAGE] Filling full name: ${fullName}`);
    await this.fill(this.locators.fullNameInput, fullName);
  }

  // Fill email field
  async fillEmail(email) {
    console.log(`[CONTACT PAGE] Filling email: ${email}`);
    await this.fill(this.locators.emailInput, email);
  }

  // Fill subject field
  async fillSubject(subject) {
    console.log(`[CONTACT PAGE] Filling subject: ${subject}`);
    await this.fill(this.locators.subjectInput, subject);
  }

  // Fill message field
  async fillMessage(message) {
    console.log('[CONTACT PAGE] Filling message');
    await this.fill(this.locators.messageTextarea, message);
  }

  // Click send message button
  async clickSendMessageButton() {
    console.log('[CONTACT PAGE] Clicking send message button');
    await this.click(this.locators.sendMessageButton);
  }

  // Submit contact form
  async submitContactForm(fullName, email, subject, message) {
    console.log('[CONTACT PAGE] Submitting contact form');
    await this.fillFullName(fullName);
    await this.fillEmail(email);
    await this.fillSubject(subject);
    await this.fillMessage(message);
    await this.clickSendMessageButton();
  }

  // Verify all form fields are visible
  async assertAllFieldsVisible() {
    console.log('[CONTACT PAGE] Asserting all fields are visible');
    await this.assertVisible(this.locators.fullNameInput);
    await this.assertVisible(this.locators.emailInput);
    await this.assertVisible(this.locators.subjectInput);
    await this.assertVisible(this.locators.messageTextarea);
  }

  // Clear all form fields
  async clearAllFields() {
    console.log('[CONTACT PAGE] Clearing all fields');
    await this.clear(this.locators.fullNameInput);
    await this.clear(this.locators.emailInput);
    await this.clear(this.locators.subjectInput);
    await this.clear(this.locators.messageTextarea);
  }
}

export default ContactPage;
