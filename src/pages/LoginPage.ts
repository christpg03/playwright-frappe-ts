import { Locator, Page } from '@playwright/test';

import ENV from '../config/env';
import URLs from '../config/url';

import { AppsPage } from './AppsPage';
import { BasePage } from './abstract/BasePage';
import { HomePage } from './HomePage';
import { VisibilityError } from '../helpers/errors';

/**
 * Represents the login page of the application.
 * This class extends the BasePage class and provides methods to interact with the login page.
 *
 * @class
 * @extends BasePage
 * @property {string} url - The URL of the login page.
 * @property {Locator} usernameField - The locator for the username input field.
 * @property {Locator} passwordField - The locator for the password input field.
 * @property {Locator} loginButton - The locator for the login button.
 */
export class LoginPage extends BasePage {
  public readonly url: string;
  public readonly usernameField: Locator;
  public readonly passwordField: Locator;
  public readonly loginButton: Locator;

  /**
   * Initializes a new instance of the LoginPage class.
   *
   * @param {Page} page - The Playwright page object representing the browser page.
   */
  constructor(page: Page) {
    // TODO: Change the fields for inputs components
    super(page);
    this.url = `${URLs.LOGIN_URL}#login`;
    this.usernameField = page.locator('#login_email');
    this.passwordField = page.locator('#login_password');
    this.loginButton = page
      .getByRole('button', { name: 'Login', exact: true })
      .or(page.locator('button', { hasText: 'Iniciar sesión' }));
  }

  /**
   * Fills the username field with the given username.
   *
   * @param {string} username - The username to fill in the username field.
   * @return {Promise<void>} A promise that resolves when the username field is filled.
   */
  async typeUsername(username: string) {
    // await expect(this.usernameField).toBeVisible();
    if (await this.usernameField.isVisible({ timeout: ENV.OBJECT_LOAD_TIMEOUT })) {
      await this.usernameField.fill(username);
    } else {
      throw new VisibilityError(this.usernameField, ENV.OBJECT_LOAD_TIMEOUT);
    }
  }

  /**
   * Fills the password field with the given password.
   *
   * @param {string} password - The password to fill in the password field.
   * @return {Promise<void>} A promise that resolves when the password field is filled.
   */
  async typePassword(password: string) {
    if (await this.passwordField.isVisible({ timeout: ENV.OBJECT_LOAD_TIMEOUT })) {
      await this.passwordField.fill(password);
    } else {
      throw new VisibilityError(this.passwordField, ENV.OBJECT_LOAD_TIMEOUT);
    }
  }

  /**
   * Clicks the login button.
   *
   * @returns {Promise<void>} A promise that resolves when the login button is clicked.
   */
  async clickLoginButton() {
    if (await this.loginButton.isVisible({ timeout: ENV.OBJECT_LOAD_TIMEOUT })) {
      await this.loginButton.click();
    } else {
      throw new VisibilityError(this.loginButton, ENV.OBJECT_LOAD_TIMEOUT);
    }
  }

  /**
   * Logs in the user with the given username and password.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @return {Promise<void>} - A promise that resolves when the login process is complete.
   */
  async login(username: string, password: string) {
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.clickLoginButton();
    // post login under try-catch block because of random ERP behavior
    try {
      const appsPage = new AppsPage(this.page);
      await appsPage.clickErpButton();
    } catch (e) {
      console.log('ERP button not found; Apps page bypassed');
    }
    const homePage = new HomePage(this.page);
    await homePage.navigate();
  }
}
