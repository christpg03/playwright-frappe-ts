import type { Locator, Page } from '@playwright/test';

import { BaseComponent } from './BaseComponent';
import { ComponentDisabledError } from '../../helpers';

/**
 * Abstract base class for components that can be enabled or disabled.
 *
 * Extends BaseComponent to provide functionality for managing component state
 * and preventing actions on disabled components.
 *
 * @abstract
 * @class EnableableComponent
 * @extends {BaseComponent}
 * @property {boolean} _enabled - Internal state tracking if the component is enabled.
 */
export abstract class EnableableComponent extends BaseComponent {
  private _enabled: boolean = true;

  /**
   * Initializes a new EnableableComponent instance.
   *
   * Creates an enableable component with a Playwright locator and optional enabled state.
   * Components are enabled by default unless explicitly disabled.
   *
   * @param {Page} page - The Playwright page instance.
   * @param {Locator} locator - The Playwright locator for this component.
   * @param {BaseComponent} [parent] - Optional parent component for hierarchical nesting.
   * @param {boolean} [enabled=true] - Whether the component should be enabled initially.
   */
  constructor(page: Page, locator: Locator, parent?: BaseComponent, enabled: boolean = true) {
    super(page, locator, parent);
    this.enabled = enabled;
  }

  /**
   * Gets the enabled state of the component.
   *
   * @returns {boolean} True if the component is enabled, false if disabled.
   */
  get enabled(): boolean {
    return this._enabled;
  }

  /**
   * Sets the enabled state of the component.
   *
   * @param {boolean} value - True to enable the component, false to disable it.
   */
  set enabled(value: boolean) {
    this._enabled = value;
  }

  /**
   * Throws an error if the component is disabled.
   *
   * This method is used to prevent actions on disabled components by throwing
   * a ComponentDisabledError when the component is in a disabled state.
   *
   * @param {string} componentName - The name of the component for error reporting.
   * @param {string} [action=''] - Optional description of the action being attempted.
   * @throws {ComponentDisabledError} When the component is disabled.
   */
  throwIfDisabled(componentName: string, action: string = ''): void {
    if (!this._enabled) {
      throw new ComponentDisabledError(componentName, action);
    }
  }
}
