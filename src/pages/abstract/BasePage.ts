import { Locator, Page } from 'playwright';

import ENV from '../../config/env';

import { waitForAttributeValue } from '../../helpers/utils';

/**
 * BasePage class for Playwright tests in TypeScript
 * This abstract class serves as a base for all page objects in a Playwright testing framework.
 * @class
 * @abstract
 *
 * @property {Page} page - The Playwright page object representing the browser page.
 * @property {string} url - The URL of the page.
 */

export abstract class BasePage {
  protected abstract url: string;
  public page: Page;
  /**
   * Initializes the base page object with the given Playwright page object.
   *
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the page's URL.
   *
   * @param {number} [timeout=Env.PAGE_LOAD_TIMEOUT] - The timeout for the navigation operation.
   * @returns {Promise<void>} - A promise that resolves when the navigation is complete.
   */
  async navigate(timeout: number = ENV.PAGE_LOAD_TIMEOUT): Promise<void> {
    await this.page.goto(this.url, { timeout: timeout });
    await this.page.waitForURL(this.url, { timeout: timeout });
  }

  /**
   * Waits for the page to load and asserts that the current URL matches the page's URL.
   * @returns {Promise<boolean>} - A promise that resolves to true if the page is loaded and the current URL matches the page's URL.
   */
  async isLoaded(): Promise<boolean> {
    const body: Locator = this.page.locator('body');

    await body.waitFor({ timeout: ENV.OBJECT_LOAD_TIMEOUT });
    await waitForAttributeValue(this.page, 'body', 'data-ajax-state', 'complete');
    // Accept URLs that match this.url exactly or have any suffix or query parameters
    const pattern = new RegExp(this.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(.*)?$');
    return pattern.test(this.page.url());
  }
}
