import { expect, Page } from '@playwright/test';

import ENV from '../../config/env';

/**
 * Abstract base class for Playwright page objects.
 *
 * Provides common navigation and page state utilities for all pages.
 *
 * @abstract
 * @class BasePage
 * @property {Page} page - The Playwright page instance.
 * @property {string} url - The URL of the page (must be defined in subclasses).
 */
export abstract class BasePage {
  /**
   * The URL of the page. Must be implemented by subclasses.
   * @type {string}
   */
  protected abstract url: string;

  /**
   * The Playwright page instance.
   * @type {Page}
   */
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
   * Navigates to the page's URL and waits for the URL to match.
   *
   * @param {number} [timeout=ENV.PAGE_LOAD_TIMEOUT] - Timeout for navigation in milliseconds.
   * @returns {Promise<void>} Resolves when navigation and URL assertion are complete.
   */
  async navigate(timeout: number = ENV.PAGE_LOAD_TIMEOUT): Promise<void> {
    await this.page.goto(this.url, { timeout: timeout });
    await expect(this.page).toHaveURL(this.url, { timeout: timeout });
  }

  /**
   * Waits for the DOM to be loaded and asserts the current URL matches the page's URL (with optional suffix or query params).
   *
   * @returns {Promise<boolean>} Resolves to true if the page is loaded and the URL matches.
   */
  async isLoaded(): Promise<boolean> {
    await this.page.waitForLoadState('domcontentloaded');

    // Accept URLs that match this.url exactly or have any suffix or query parameters
    const pattern = new RegExp(this.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(.*)?$');
    await expect(this.page).toHaveURL(pattern, { timeout: ENV.PAGE_LOAD_TIMEOUT });
    return true;
  }

  /**
   * Waits for the page's <body> element to have data-ajax-state="complete".
   *
   * @returns {Promise<void>} Resolves when the AJAX state is complete.
   */
  async waitForPageLoad(): Promise<void> {
    const body = this.page.locator('body');
    expect(body).toHaveAttribute('data-ajax-state', 'complete', { timeout: ENV.PAGE_LOAD_TIMEOUT });
  }
}
