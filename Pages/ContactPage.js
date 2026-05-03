// ContactPage - This is where we keep all the logic for interacting with the Contact Us screen
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class ContactPage extends BasePage {
  constructor(page) {
    // We pass the browser page to the base class so it can handle the low-level clicks and fills
    super(page);
    // We grab our specific contact page locators (like input IDs) from the central locator file
    this.locators = locators.contactPage;
  }

  // This function simply points the browser to the /contact page
  async goto() {
    console.log('[CONTACT PAGE] Navigating to contact page');
    await this.page.goto('/contact');
  }

  // A quick check to see if the "Contact Us" header is actually visible on the screen
  async isContactPageVisible() {
    console.log('[CONTACT PAGE] Checking if page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // This ensures the main title "Contact Us" is present and correct
  async verifyPageHeading() {
    console.log('[CONTACT PAGE] Verifying heading');
    await this.assertVisible(this.locators.heading);
    const headingText = await this.getText(this.locators.heading);
    return headingText;
  }

  // Type the user's name into the name box
  async fillFullName(fullName) {
    console.log(`[CONTACT PAGE] Filling full name: ${fullName}`);
    // We wait for the box to actually exist before we try to type in it
    await this.page.waitForSelector(this.locators.fullNameInput.primary);
    await this.fill(this.locators.fullNameInput, fullName);
  }

  // Type the user's email into the email box
  async fillEmail(email) {
    console.log(`[CONTACT PAGE] Filling email: ${email}`);
    // We wait for the email field to appear to prevent any "flaky" test failures
    await this.page.waitForSelector(this.locators.emailInput.primary);
    await this.fill(this.locators.emailInput, email);
  }

  // Enter the subject of the inquiry
  async fillSubject(subject) {
    console.log(`[CONTACT PAGE] Filling subject: ${subject}`);
    await this.fill(this.locators.subjectInput, subject);
  }

  // Type out the actual message the user wants to send
  async fillMessage(message) {
    console.log('[CONTACT PAGE] Filling message');
    await this.fill(this.locators.messageTextarea, message);
  }

  // Click the big "Send Message" button to submit the form
  async clickSendMessageButton() {
    console.log('[CONTACT PAGE] Clicking send message button');
    await this.click(this.locators.sendMessageButton);
  }

  // This is a "convenience" function that does everything for us in one step
  async submitContactForm(fullName, email, subject, message) {
    console.log('[CONTACT PAGE] Submitting contact form');
    await this.fillFullName(fullName);
    await this.fillEmail(email);
    await this.fillSubject(subject);
    await this.fillMessage(message);
    await this.clickSendMessageButton();
  }

  // Checks that every part of the form (name, email, subject, message) is actually showing up
  async assertAllFieldsVisible() {
    console.log('[CONTACT PAGE] Asserting all fields are visible');
    await this.assertVisible(this.locators.fullNameInput);
    await this.assertVisible(this.locators.emailInput);
    await this.assertVisible(this.locators.subjectInput);
    await this.assertVisible(this.locators.messageTextarea);
  }

  // Clears out any text in the form fields (useful for testing resets)
  async clearAllFields() {
    console.log('[CONTACT PAGE] Clearing all fields');
    await this.clear(this.locators.fullNameInput);
    await this.clear(this.locators.emailInput);
    await this.clear(this.locators.subjectInput);
    await this.clear(this.locators.messageTextarea);
  }
}

export default ContactPage;
