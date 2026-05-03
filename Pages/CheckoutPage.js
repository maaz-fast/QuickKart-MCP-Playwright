// CheckoutPage - Handles checkout functionality
import BasePage from './BasePage.js';
import locators from '../Locators/locators.js';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators.checkoutPage;
    this.navLocators = locators.navigation;
  }

  // Check if checkout page is visible
  async isCheckoutPageVisible() {
    console.log('[CHECKOUT PAGE] Checking if checkout page is visible');
    return await this.isVisible(this.locators.heading);
  }

  // Assert checkout page visible
  async assertCheckoutPageVisible() {
    console.log('[CHECKOUT PAGE] Asserting checkout page is visible');
    await this.assertVisible(this.locators.heading);
  }

  // === SHIPPING INFORMATION ===

  // Fill first name
  async fillFirstName(firstName) {
    console.log(`[CHECKOUT PAGE] Filling first name: ${firstName}`);
    await this.fill(this.locators.firstNameInput, firstName);
  }

  // Fill last name
  async fillLastName(lastName) {
    console.log(`[CHECKOUT PAGE] Filling last name: ${lastName}`);
    await this.fill(this.locators.lastNameInput, lastName);
  }

  // Fill email
  async fillEmail(email) {
    console.log(`[CHECKOUT PAGE] Filling email: ${email}`);
    await this.fill(this.locators.emailInput, email);
  }

  // Fill phone
  async fillPhone(phone) {
    console.log(`[CHECKOUT PAGE] Filling phone: ${phone}`);
    await this.fill(this.locators.phoneInput, phone);
  }

  // Fill street address
  async fillStreetAddress(address) {
    console.log(`[CHECKOUT PAGE] Filling street address: ${address}`);
    await this.fill(this.locators.streetAddressInput, address);
  }

  // Fill city
  async fillCity(city) {
    console.log(`[CHECKOUT PAGE] Filling city: ${city}`);
    await this.fill(this.locators.cityInput, city);
  }

  // Fill zip code
  async fillZipCode(zipCode) {
    console.log(`[CHECKOUT PAGE] Filling zip code: ${zipCode}`);
    await this.fill(this.locators.zipCodeInput, zipCode);
  }

  // === PAYMENT INFORMATION ===

  // Fill cardholder name
  async fillCardholderName(name) {
    console.log(`[CHECKOUT PAGE] Filling cardholder name: ${name}`);
    await this.fill(this.locators.cardholderNameInput, name);
  }

  // Fill card number
  async fillCardNumber(cardNumber) {
    console.log('[CHECKOUT PAGE] Filling card number');
    await this.fill(this.locators.cardNumberInput, cardNumber);
  }

  // Fill expiry date
  async fillExpiry(expiry) {
    console.log(`[CHECKOUT PAGE] Filling expiry: ${expiry}`);
    await this.fill(this.locators.expiryInput, expiry);
  }

  // Fill CVV
  async fillCVV(cvv) {
    console.log('[CHECKOUT PAGE] Filling CVV');
    await this.fill(this.locators.cvvInput, cvv);
  }

  // === COMPLETE FORMS ===

  // Fill all shipping information
  async fillShippingInformation(shippingData) {
    console.log('[CHECKOUT PAGE] Filling shipping information');
    await this.fillFirstName(shippingData.firstName);
    await this.fillLastName(shippingData.lastName);
    await this.fillEmail(shippingData.email);
    if (shippingData.phone) await this.fillPhone(shippingData.phone);
    await this.fillStreetAddress(shippingData.address);
    await this.fillCity(shippingData.city);
    await this.fillZipCode(shippingData.zipCode);
  }

  // Convenience method for filling shipping info
  async fillShippingInfo(firstName, lastName, email, phone, address, city, zip) {
    await this.fillShippingInformation({ firstName, lastName, email, phone, address, city, zipCode: zip });
  }

  // Fill all payment information
  async fillPaymentInformation(paymentData) {
    console.log('[CHECKOUT PAGE] Filling payment information');
    await this.fillCardholderName(paymentData.cardholderName);
    await this.fillCardNumber(paymentData.cardNumber);
    await this.fillExpiry(paymentData.expiry);
    await this.fillCVV(paymentData.cvv);
  }

  // Convenience method for filling payment info
  async fillPaymentDetails(cardholderName, cardNumber, expiry, cvv) {
    await this.fillPaymentInformation({ cardholderName, cardNumber, expiry, cvv });
  }

  // === CHECKOUT ACTIONS ===

  // Click place order button
  async clickPlaceOrderButton() {
    console.log('[CHECKOUT PAGE] Clicking place order button');
    await this.click(this.locators.placeOrderButton);
  }

  // Convenience method for placing order
  async placeOrder() {
    await this.clickPlaceOrderButton();
  }

  // Complete checkout
  async completeCheckout(shippingData, paymentData) {
    console.log('[CHECKOUT PAGE] Starting checkout process');
    await this.fillShippingInformation(shippingData);
    await this.fillPaymentInformation(paymentData);
    await this.clickPlaceOrderButton();
    
    // Wait for order processing
    await this.sleep(2000);
  }

  // === ASSERTIONS ===

  // Assert all form fields are visible
  async assertAllFieldsVisible() {
    console.log('[CHECKOUT PAGE] Asserting all fields are visible');
    await this.assertVisible(this.locators.firstNameInput);
    await this.assertVisible(this.locators.lastNameInput);
    await this.assertVisible(this.locators.emailInput);
    await this.assertVisible(this.locators.streetAddressInput);
    await this.assertVisible(this.locators.cityInput);
    await this.assertVisible(this.locators.zipCodeInput);
    await this.assertVisible(this.locators.cardholderNameInput);
    await this.assertVisible(this.locators.cardNumberInput);
    await this.assertVisible(this.locators.expiryInput);
    await this.assertVisible(this.locators.cvvInput);
  }

  // Assert place order button is visible
  async assertPlaceOrderButtonVisible() {
    console.log('[CHECKOUT PAGE] Asserting place order button is visible');
    await this.assertVisible(this.locators.placeOrderButton);
  }

  // Assert shipping info heading visible
  async assertShippingInfoVisible() {
    console.log('[CHECKOUT PAGE] Asserting shipping info heading is visible');
    await this.assertVisible(this.locators.shippingHeading);
  }

  // Assert payment details heading visible
  async assertPaymentDetailsVisible() {
    console.log('[CHECKOUT PAGE] Asserting payment details heading is visible');
    await this.assertVisible(this.locators.paymentHeading);
  }

  // Assert order summary is visible
  async assertOrderSummaryVisible() {
    console.log('[CHECKOUT PAGE] Asserting order summary is visible');
    await this.assertVisible(this.locators.orderSummaryHeading);
  }

  // Verify form values
  async verifyFormValues(expectedData) {
    console.log('[CHECKOUT PAGE] Verifying form values');
    const firstName = await this.getInputValue(this.locators.firstNameInput);
    const lastName = await this.getInputValue(this.locators.lastNameInput);
    const email = await this.getInputValue(this.locators.emailInput);
    
    return {
      firstName: firstName === expectedData.firstName,
      lastName: lastName === expectedData.lastName,
      email: email === expectedData.email
    };
  }

  // Clear all shipping fields
  async clearShippingFields() {
    console.log('[CHECKOUT PAGE] Clearing shipping fields');
    await this.clear(this.locators.firstNameInput);
    await this.clear(this.locators.lastNameInput);
    await this.clear(this.locators.emailInput);
    await this.clear(this.locators.streetAddressInput);
    await this.clear(this.locators.cityInput);
    await this.clear(this.locators.zipCodeInput);
  }

  // Clear all payment fields
  async clearPaymentFields() {
    console.log('[CHECKOUT PAGE] Clearing payment fields');
    await this.clear(this.locators.cardholderNameInput);
    await this.clear(this.locators.cardNumberInput);
    await this.clear(this.locators.expiryInput);
    await this.clear(this.locators.cvvInput);
  }

  // Assert validation error is visible
  async assertValidationErrorVisible() {
    console.log('[CHECKOUT PAGE] Asserting validation error is visible');
    await this.assertVisible(this.locators.validationError);
  }
}

export default CheckoutPage;
