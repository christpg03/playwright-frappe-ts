import { Page } from '@playwright/test';

import URLs from '../config/url';

import { BasePage } from './abstract/BasePage';

/**
 * Represents the home page of the application.
 * This class extends the BasePage class and provides methods to interact with the home page.
 *
 * @class
 * @extends BasePage
 * @property {string} url - The URL of the home page.
 */
export class HomePage extends BasePage {
  // TODO: Add links
  protected readonly url: string;

  constructor(page: Page) {
    super(page);
    this.url = URLs.MOD_HOME;
  }
}
