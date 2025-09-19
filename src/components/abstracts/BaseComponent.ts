import type { Locator, Page } from '@playwright/test';

import { ENV } from '../../config';
import {
  ComponentHierarchyError,
  EmptyPropertyError,
  InvalidLocatorError,
  LocatorImmutabilityError,
} from '../../helpers/errors.js';

/**
 * Abstract base class for Playwright component objects.
 *
 * Provides common functionality for interacting with UI components, including
 * locator management, parent-child relationships, and basic visibility checks.
 *
 * @abstract
 * @class BaseComponent
 * @property {Page} page - The Playwright page instance.
 * @property {Locator} _locator - The internal Playwright locator for this component.
 * @property {BaseComponent} _parent - Optional parent component for hierarchical structures.
 * @property {string} _locatorString - String representation of the locator for debugging.
 */
export abstract class BaseComponent {
  private _locator: Locator;
  private _parent?: BaseComponent;
  private _locatorString?: string;
  public page: Page;

  /**
   * Initializes a new BaseComponent instance.
   *
   * Creates a component with a Playwright locator, optionally nested within a parent component.
   * If a parent is provided, the locator will be scoped to the parent's locator.
   *
   * @param {Page} page - The Playwright page instance.
   * @param {Locator} locator - The Playwright locator for this component.
   * @param {BaseComponent} [parent] - Optional parent component for hierarchical nesting.
   */
  constructor(page: Page, locator: Locator, parent?: BaseComponent) {
    this.page = page;
    this._parent = parent;

    if (parent) {
      this._locator = parent.locator.locator(locator);
    } else {
      this._locator = locator;
    }
  }

  /**
   * Gets the Playwright locator for this component.
   *
   * @returns {Locator} The Playwright locator instance.
   */
  get locator(): Locator {
    return this._locator;
  }

  /**
   * Gets the parent component of this component.
   *
   * @returns {BaseComponent} The parent component instance.
   * @throws {ComponentHierarchyError} When no parent component exists.
   */
  get parent(): BaseComponent {
    if (!this._parent) {
      throw new ComponentHierarchyError(this.constructor.name);
    }
    return this._parent;
  }

  /**
   * Sets the locator string for this component.
   *
   * The locator string is immutable once set and is used for debugging purposes.
   * It must be a non-empty string value.
   *
   * @param {string} value - The locator string to set.
   * @throws {InvalidLocatorError} When the value is not a string or is empty/whitespace.
   * @throws {LocatorImmutabilityError} When attempting to change an already set locator string.
   */
  set locatorString(value: string) {
    if (typeof value !== 'string') {
      throw new InvalidLocatorError(value, 'Locator string must be a string value.');
    }

    if (!value || value.trim() === '') {
      throw new InvalidLocatorError(
        value,
        'Locator string cannot be empty or contain only whitespace.',
      );
    }

    if (this._locatorString) {
      throw new LocatorImmutabilityError(this.constructor.name, this.locatorString, value);
    }

    this._locatorString = value;
  }

  /**
   * Gets the locator string for this component.
   *
   * @returns {string} The locator string.
   * @throws {EmptyPropertyError} When the locator string has not been set.
   */
  get locatorString(): string {
    if (!this._locatorString) {
      throw new EmptyPropertyError('locatorString', this.constructor.name);
    }
    return this._locatorString;
  }

  /**
   * Checks if the component is currently visible on the page.
   *
   * Uses the configured object load timeout for the visibility check.
   *
   * @returns {Promise<boolean>} A promise that resolves to true if the component is visible, false otherwise.
   */
  public async isVisible(): Promise<boolean> {
    return await this._locator.isVisible({ timeout: ENV.OBJECT_LOAD_TIMEOUT });
  }
}
