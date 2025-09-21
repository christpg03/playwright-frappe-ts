import type { Page } from '@playwright/test';

import { IFieldNameValidator } from '../interfaces/IFieldNameValidator';
import { InputComponent } from '../abstracts/InputComponent';
import { StrategyConfig } from '../../types/Components';

/**
 * Unlabeled input component for Frappe form field interactions.
 *
 * Represents an unlabeled input field component that can be automatically filled
 * using a strategy pattern. Extends InputComponent to support input-specific operations
 * and inherits auto-fill capabilities for automatic value generation.
 *
 * This component targets input elements directly using the data-fieldname attribute:
 * - Uses data-fieldname attribute to identify specific input fields
 * - Targets input elements directly without requiring frappe-control wrapper
 * - Supports both enabled and disabled input states
 *
 * @class UnlabeledInputComponent
 * @extends {InputComponent}
 * @property {string} placeholder - The placeholder text for the input field.
 */
// TODO: Add a method to validate that the data-fieldname attribute matches the configured dataFieldName
export class UnlabeledInputComponent extends InputComponent implements IFieldNameValidator {
  private placeholder: string;

  /**
   * Initializes a new UnlabeledInputComponent instance.
   *
   * Creates an unlabeled input component that targets input elements directly by their data-fieldname attribute.
   * The component constructs a locator that finds input elements with the specified data-fieldname,
   * making it suitable for input fields that don't use the frappe-control wrapper structure.
   *
   * @param {Page} page - The Playwright page instance.
   * @param {string} dataFieldName - The data field name used to identify the input field via data-fieldname attribute.
   * @param {string} placeholder - The placeholder text for this input field.
   * @param {StrategyConfig} strategyConfig - Configuration object containing the strategy function and optional parameters for auto-filling.
   * @param {InputComponent} [parent] - Optional parent input component for hierarchical nesting.
   * @param {boolean} [enabled=true] - Whether the component should be enabled initially. Affects the input selector used.
   */
  constructor(
    page: Page,
    dataFieldName: string,
    placeholder: string,
    strategyConfig: StrategyConfig,
    parent?: InputComponent,
    enabled = true,
  ) {
    const field_locator = page.locator(`input[data-fieldname="${dataFieldName}"]`);

    super(page, field_locator, strategyConfig, parent, enabled);
    this.placeholder = placeholder;
  }

  /**
   * Validates and asserts that the field name is correctly configured.
   *
   * This method is intended to validate that the data-fieldname attribute
   * in the DOM matches the dataFieldName parameter used to construct this component.
   * It ensures the component is properly configured to target the correct input field.
   *
   * @throws {Error} Currently throws "Method not implemented." as this is a placeholder.
   * @todo Implement field name validation logic to compare the component's dataFieldName with the actual data-fieldname attribute in the DOM.
   */
  assertFieldName() {
    throw new Error('Method not implemented.');
  }
}
