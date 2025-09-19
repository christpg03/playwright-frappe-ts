import type { Locator } from '@playwright/test';

import { ENV } from '../../config';
import {
  ComponentHierarchyError,
  EmptyPropertyError,
  InvalidLocatorError,
  LocatorImmutabilityError,
} from '../../helpers/errors.js';

export abstract class BaseComponent {
  private _locator: Locator;
  private _parent?: BaseComponent;
  private _locatorString?: string;

  constructor(locator: Locator, parent?: BaseComponent) {
    this._locator = locator;
    this._parent = parent;
  }

  get locator(): Locator {
    return this._locator;
  }

  get parent(): BaseComponent {
    if (!this._parent) {
      throw new ComponentHierarchyError(this.constructor.name);
    }
    return this._parent;
  }

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

  get locatorString(): string {
    if (!this._locatorString) {
      throw new EmptyPropertyError('locatorString', this.constructor.name);
    }
    return this._locatorString;
  }

  public async isVisible(): Promise<boolean> {
    return await this._locator.isVisible({ timeout: ENV.OBJECT_LOAD_TIMEOUT });
  }
}
