import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

import ENV from '../config/env';
import URLs from '../config/url';

import { BasePage } from './abstract/BasePage';

/**
 * Represents the Apps page of the application.
 * This class extends the BasePage class and provides methods to interact with the Apps page.
 * @class
 * @extends BasePage
 *
 * @property {string} url - The URL of the Apps page.
 * @property {Locator} buttonERP - The locator for the "ERP" button.
 */
export class AppsPage extends BasePage {
  public readonly url: string;
  public readonly buttonERP: Locator;

  /**
   * Initializes the AppsPage object with the given Playwright page object.
   *
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    // TODO: Change the button for components
    super(page);
    this.url = URLs.MOD_APPS;
    this.buttonERP = page.locator('a[href="/app/home"]');
  }

  /**
   * Clicks the "ERP" button and waits for the page to navigate to the home page.
   *
   * @param {number} waitUpTo - The maximum time to wait for the button to be clickable.
   * @return {Promise<void>} A promise that resolves when the button is clicked and the page navigates to the home page.
   */
  async clickErpButton(): Promise<void> {
    await this.buttonERP.waitFor({ timeout: ENV.OBJECT_LOAD_TIMEOUT });
    await this.buttonERP.click();
    await expect(this.page).toHaveURL(URLs.MOD_HOME);
  }
}
