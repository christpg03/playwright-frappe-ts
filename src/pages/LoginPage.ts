import type { Locator, Page } from '@playwright/test';

import { ENV } from '../config/env';
import { URLs } from '../config/url';

import type { AuthProvider, Credentials } from '../types/Auth';
import { AppsPage } from './AppsPage';
import { BasePage } from './abstract/BasePage';
import { HomePage } from './HomePage';
import { VisibilityError } from '../helpers/errors';

/**
 * Represents the login page of the application.
 * Provides methods to interact with the login page, such as filling in credentials and submitting the login form.
 *
 * @extends BasePage
 * @property {string} url - The URL of the login page.
 * @property {Locator} usernameField - Locator for the username input field.
 * @property {Locator} passwordField - Locator for the password input field.
 * @property {Locator} loginButton - Locator for the login button.
 * @property {AuthProvider} authProvider - Provider for authentication credentials.
 */
export class LoginPage extends BasePage {
  public readonly url: string;
  public readonly usernameField: Locator;
  public readonly passwordField: Locator;
  public readonly loginButton: Locator;
  private authProvider: AuthProvider;
  /**
   * Initializes a new instance of the LoginPage class.
   *
   * @param {Page} page - Playwright page object representing the browser page.
   * @param {AuthProvider} authProvider - Provider for authentication credentials.
   */
  constructor(page: Page, authProvider: AuthProvider) {
    // TODO: Change the fields for inputs components
    super(page);
    this.url = `${URLs.LOGIN_URL}#login`;
    this.authProvider = authProvider;
    this.usernameField = page.locator('#login_email');
    this.passwordField = page.locator('#login_password');
    this.loginButton = page
      .getByRole('button', { name: 'Login', exact: true })
      .or(page.locator('button', { hasText: 'Iniciar sesión' }));
  }

  /**
   * Fills the username field with the provided username.
   *
   * @param {string} username - Username to enter.
   * @throws {VisibilityError} If the username field is not visible within the timeout.
   * @returns {Promise<void>} Resolves when the username is filled.
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
   * Fills the password field with the provided password.
   *
   * @param {string} password - Password to enter.
   * @throws {VisibilityError} If the password field is not visible within the timeout.
   * @returns {Promise<void>} Resolves when the password is filled.
   */
  async typePassword(password: string) {
    if (await this.passwordField.isVisible({ timeout: ENV.OBJECT_LOAD_TIMEOUT })) {
      await this.passwordField.fill(password);
    } else {
      throw new VisibilityError(this.passwordField, ENV.OBJECT_LOAD_TIMEOUT);
    }
  }

  /**
   * Clicks the login button to submit the login form.
   *
   * @throws {VisibilityError} If the login button is not visible within the timeout.
   * @returns {Promise<void>} Resolves when the login button is clicked.
   */
  async clickLoginButton() {
    if (await this.loginButton.isVisible({ timeout: ENV.OBJECT_LOAD_TIMEOUT })) {
      await this.loginButton.click();
    } else {
      throw new VisibilityError(this.loginButton, ENV.OBJECT_LOAD_TIMEOUT);
    }
  }

  /**
   * Logs in the user with the specified username and password.
   * Navigates to the home page after login, optionally bypassing the Apps page if not present.
   *
   * @param {string} username - Username for login.
   * @param {string} password - Password for login.
   * @returns {Promise<void>} Resolves when the login process is complete.
   */
  async login({ username, password }: Credentials) {
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

  /**
   * Logs in a user by their role using credentials from the AuthProvider.
   *
   * @param {string} role - The role for which to retrieve credentials and log in.
   * @returns {Promise<void>} Resolves when the login process is complete.
   */
  async loginByRole(role: string) {
    const credentials = this.authProvider.getCredentialsByRole(role);
    await this.login(credentials);
  }
}
