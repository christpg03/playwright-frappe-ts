import type { Page } from '@playwright/test';

import { InputComponent } from '../abstracts/InputComponent';
import { StrategyConfig } from '../../types/Components';

/**
 * Labeled input component for Frappe form field interactions.
 *
 * Represents a labeled input field component that can be automatically filled
 * using a strategy pattern. Extends InputComponent to support input-specific operations
 * and inherits auto-fill capabilities for automatic value generation.
 *
 * This component targets Frappe controls with specific DOM structure:
 * - Uses tooltip content to identify fields by data field name
 * - Filters visible frappe-control elements
 * - Supports both enabled and disabled input states
 *
 * @class LabeledInputComponent
 * @extends {InputComponent}
 * @property {string} label - The display label for the input field.
 */
// TODO: Add a method to compare the field label with the label displayed in the system
export class LabeledInputComponent extends InputComponent {
  private label: string;

  /**
   * Initializes a new LabeledInputComponent instance.
   *
   * Creates a labeled input component that targets Frappe form controls by their data field name.
   * The component constructs a locator that finds frappe-control elements containing a tooltip
   * with the specified data field name, then locates the appropriate input element within.
   *
   * @param {Page} page - The Playwright page instance.
   * @param {string} dataFieldName - The data field name used to identify the field via tooltip content.
   * @param {string} label - The human-readable label for this input field.
   * @param {StrategyConfig} strategyConfig - Configuration object containing the strategy function and optional parameters for auto-filling.
   * @param {InputComponent} [parent] - Optional parent input component for hierarchical nesting.
   * @param {boolean} [enabled=true] - Whether the component should be enabled initially. Affects the input selector used.
   */
  constructor(
    page: Page,
    dataFieldName: string,
    label: string,
    strategyConfig: StrategyConfig,
    parent?: InputComponent,
    enabled = true,
  ) {
    const tooltip_locator = page.locator(`.tooltip-content:has-text("${dataFieldName}")`);

    const field_locator = page
      .locator('frappe-control:visible')
      .filter({ has: tooltip_locator })
      .locator(enabled ? 'input' : '.like-disabled-input');

    super(page, field_locator, strategyConfig, parent, enabled);
    this.label = label;
  }

  /**
   * Asserts that the component's label matches the expected label.
   *
   * This method is intended to validate that the label displayed in the UI
   * matches the label configured for this component instance.
   *
   * @throws {Error} Currently throws "Method not implemented." as this is a placeholder.
   * @todo Implement label assertion logic to compare field label with displayed system label.
   */
  assertLabel() {
    throw new Error('Method not implemented.');
  }
}
