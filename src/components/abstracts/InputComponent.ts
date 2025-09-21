import type { Locator, Page } from '@playwright/test';

import { BaseComponent } from './BaseComponent';
import { EnableableComponent } from './EnableableComponent';
import { IAutoFillable } from '../interfaces/IAutoFillable';
import { StrategyConfig } from '../../types/Components';

/**
 * Abstract base class for input components with auto-fill capabilities.
 *
 * Extends EnableableComponent to provide input-specific functionality including
 * filling, clearing, and retrieving values from input elements. Implements
 * IAutoFillable to support strategy-based automatic value generation.
 *
 * @abstract
 * @class InputComponent
 * @extends {EnableableComponent}
 * @implements {IAutoFillable}
 * @property {StrategyConfig} strategyConfig - Configuration for the auto-fill strategy including the strategy function and parameters.
 */
export abstract class InputComponent extends EnableableComponent implements IAutoFillable {
  private strategyConfig: StrategyConfig;

  /**
   * Initializes a new InputComponent instance.
   *
   * Creates an input component with strategy-based auto-fill capability.
   * The component inherits enablement functionality from EnableableComponent
   * and can be optionally nested within a parent component.
   *
   * @param {Page} page - The Playwright page instance.
   * @param {Locator} locator - The Playwright locator for this input component.
   * @param {StrategyConfig} strategyConfig - Configuration object containing the strategy function and optional parameters for auto-filling.
   * @param {BaseComponent} [parent] - Optional parent component for hierarchical nesting.
   * @param {boolean} [enabled=true] - Whether the component should be enabled initially.
   */
  constructor(
    page: Page,
    locator: Locator,
    strategyConfig: StrategyConfig,
    parent?: BaseComponent,
    enabled = true,
  ) {
    super(page, locator, parent, enabled);
    this.strategyConfig = strategyConfig;
  }

  /**
   * Fills the input component with the specified value.
   *
   * Checks if the component is enabled before performing the fill operation.
   * Clears any existing content and sets the input's value to the provided string.
   *
   * @param {string} value - The text value to fill into the input component.
   * @returns {Promise<void>} A promise that resolves when the fill operation is complete.
   * @throws {ComponentDisabledError} When the component is disabled.
   */
  async fill(value: string): Promise<void> {
    this.throwIfDisabled(this.constructor.name, 'fill');
    await this.locator.fill(value);
  }

  /**
   * Clears all content from the input component.
   *
   * Checks if the component is enabled before performing the clear operation.
   * Removes any existing text or value from the input, leaving it empty.
   *
   * @returns {Promise<void>} A promise that resolves when the clear operation is complete.
   * @throws {ComponentDisabledError} When the component is disabled.
   */
  async clear(): Promise<void> {
    this.throwIfDisabled(this.constructor.name, 'clear');
    await this.locator.fill('');
  }

  /**
   * Retrieves the current value of the input component.
   *
   * Returns the text content or value currently present in the input element.
   * This method does not require the component to be enabled.
   *
   * @returns {Promise<string>} A promise that resolves to the current value of the input component.
   */
  async getValue(): Promise<string> {
    return this.locator.inputValue();
  }

  /**
   * Automatically fills the input component using the configured strategy.
   *
   * Executes the strategy function with the configured parameters to generate
   * an appropriate value, then fills the input component with that value.
   * This method implements the IAutoFillable interface requirement.
   *
   * @returns {Promise<string>} A promise that resolves to the value that was auto-filled into the component.
   * @throws {ComponentDisabledError} When the component is disabled (inherited from fill method).
   */
  async autoFill(): Promise<string> {
    const { strategy, params = [] } = this.strategyConfig;
    const value = strategy(...params);
    await this.fill(value);
    return value;
  }
}
