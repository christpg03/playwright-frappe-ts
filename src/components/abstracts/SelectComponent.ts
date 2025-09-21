import type { Locator, Page } from '@playwright/test';

import { BaseComponent } from './BaseComponent';
import { EnableableComponent } from './EnableableComponent';
import { ISelectable } from '../interfaces/ISelectable';
import { SelectionError } from '../../helpers/errors';
import { toLowerSnakeCase } from '../../helpers/utils';

/**
 * Abstract component for handling HTML select elements.
 *
 * This component extends EnableableComponent and implements ISelectable to provide
 * functionality for interacting with dropdown/select elements. It supports selection
 * by key (snake_case), index, or random selection, and automatically handles option
 * caching and validation.
 *
 * @extends EnableableComponent
 * @implements ISelectable
 */
export class SelectComponent extends EnableableComponent implements ISelectable {
  /**
   * Cached options data as key-value pairs where keys are snake_case versions
   * of option values and values are the display text.
   */
  private _options?: Record<string, string>;

  /**
   * Creates a new SelectComponent instance.
   *
   * @param page - The Playwright page instance
   * @param locator - The Playwright locator for the select element
   * @param parent - Optional parent component for hierarchy management
   * @param enabled - Whether the component is initially enabled (default: true)
   */
  constructor(page: Page, locator: Locator, parent?: BaseComponent, enabled = true) {
    super(page, locator, parent, enabled);
  }

  /**
   * Retrieves all available options from the select element.
   *
   * This method extracts option elements from the select, converts their values
   * to snake_case keys, and caches the results for subsequent calls. Empty options
   * (common placeholder options) are automatically filtered out.
   *
   * @returns Promise that resolves to a record of snake_case keys mapped to option display text
   *
   * @example
   * ```typescript
   * const options = await selectComponent.getOptions();
   * // Returns: { "option_one": "Option One", "option_two": "Option Two" }
   * ```
   */
  public async getOptions(): Promise<Record<string, string>> {
    if (!this._options) {
      const optionElements = this.locator.locator('option');
      const optionsCount = await optionElements.count();
      const options: Record<string, string> = {};

      for (let i = 0; i < optionsCount; i++) {
        const option = optionElements.nth(i);
        const value = (await option.getAttribute('value')) || '';
        const text = (await option.textContent()) || '';

        // Skip empty options (common first option in selects)
        if (value.trim() !== '' && text.trim() !== '') {
          const snakeCaseKey = toLowerSnakeCase(value);
          options[snakeCaseKey] = text;
        }
      }
      this._options = options;
    }

    return this._options;
  }

  /**
   * Gets the currently selected value from the select element.
   *
   * @returns Promise that resolves to the value attribute of the selected option
   *
   * @example
   * ```typescript
   * const selectedValue = await selectComponent.getSelectedValue();
   * // Returns: "option1" (the value attribute, not display text)
   * ```
   */
  public async getSelectedValue(): Promise<string> {
    return this.locator.inputValue();
  }

  /**
   * Selects an option from the select element.
   *
   * This method supports multiple selection modes:
   * - By snake_case key: Pass a string that matches a key from getOptions()
   * - By index: Pass a number to select by position (0-based)
   * - Random: Pass undefined/null to select a random option
   *
   * The method automatically opens the dropdown, validates the selection,
   * and handles error cases with descriptive error messages.
   *
   * @param value - The selection value: string (key), number (index), or undefined (random)
   * @throws {ComponentDisabledError} When the component is disabled
   * @throws {SelectionError} When selection fails due to invalid parameters or missing options
   *
   * @example
   * ```typescript
   * // Select by snake_case key
   * await selectComponent.selectValue('option_one');
   *
   * // Select by index
   * await selectComponent.selectValue(0);
   *
   * // Random selection
   * await selectComponent.selectValue();
   * ```
   */
  public async selectValue(value?: string | number): Promise<void> {
    this.throwIfDisabled(this.constructor.name, 'selectValue');

    // First click on the select to open the dropdown
    await this.locator.click();

    // Get all options
    const options = await this.getOptions();
    const optionKeys = Object.keys(options);

    if (optionKeys.length === 0) {
      throw SelectionError.noOptionsAvailable(this.constructor.name);
    }

    let targetKey: string;

    if (value === undefined || value === null) {
      // Random selection - exclude empty options
      const randomIndex = Math.floor(Math.random() * optionKeys.length);
      targetKey = optionKeys[randomIndex];
    } else if (typeof value === 'string') {
      // Selection by key (lower_snake_case)
      if (!options[value]) {
        throw SelectionError.optionKeyNotFound(this.constructor.name, value, optionKeys);
      }
      targetKey = value;
    } else if (typeof value === 'number') {
      // Selection by index
      if (value < 0 || value >= optionKeys.length) {
        throw SelectionError.indexOutOfRange(this.constructor.name, value, optionKeys.length - 1);
      }
      targetKey = optionKeys[value];
    } else {
      throw SelectionError.invalidValueType(this.constructor.name, typeof value);
    }

    // Find the original value for the target key
    const originalValue = Object.entries(options).find(([key]) => key === targetKey)?.[1];

    if (!originalValue) {
      throw SelectionError.originalValueNotFound(this.constructor.name, targetKey);
    }

    // Find and click the option by its text content
    const optionLocator = this.locator.locator('option').filter({ hasText: originalValue });
    await optionLocator.click();
  }
}
