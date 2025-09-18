import type { Locator } from '@playwright/test';

/**
 * Base class for custom errors in the Playwright-Frappe suite.
 * Extends the standard Error class and adjusts the name and stack trace.
 */
export class PlaywrightFrappeError extends Error {
  /**
   * Creates a new instance of PlaywrightFrappeError.
   * @param message - Descriptive error message.
   */
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

/**
 * Error thrown when a selector does not become visible within the expected time.
 * Extends PlaywrightFrappeError for visibility-specific errors.
 */
export class VisibilityError extends PlaywrightFrappeError {
  /**
   * Creates a new instance of VisibilityError.
   * @param selector - Selector of the element that was not visible.
   * @param timeout - Timeout in milliseconds before throwing the error.
   */
  constructor(selector: Locator, timeout: number) {
    super(`Element "${selector.toString()}" did not become visible after ${timeout} ms.`);
  }
}
