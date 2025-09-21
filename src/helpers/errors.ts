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
   * @param selector - The Playwright locator of the element that was not visible.
   * @param timeout - Timeout in milliseconds before throwing the error.
   */
  constructor(selector: Locator, timeout: number) {
    super(`Element "${selector.toString()}" did not become visible after ${timeout} ms.`);
  }
}

/**
 * Error thrown when a required property is empty or undefined.
 * Extends PlaywrightFrappeError for property validation errors.
 */
export class EmptyPropertyError extends PlaywrightFrappeError {
  /**
   * Creates a new instance of EmptyPropertyError.
   * @param propertyName - Name of the property that is empty.
   * @param componentName - Name of the component where the property is located (optional).
   */
  constructor(propertyName: string, componentName?: string) {
    const location = componentName ? ` in component "${componentName}"` : '';
    super(`Property "${propertyName}"${location} cannot be empty or undefined.`);
  }
}

/**
 * Error thrown when trying to access the parent of a component that has no parent.
 * Extends PlaywrightFrappeError for component hierarchy-specific errors.
 */
export class ComponentHierarchyError extends PlaywrightFrappeError {
  /**
   * Creates a new instance of ComponentHierarchyError.
   * @param componentName - Name of the component that has no parent.
   * @param operation - The operation that was attempted (e.g., "access parent").
   */
  constructor(componentName: string, operation: string = 'access parent') {
    super(`Cannot ${operation} for component "${componentName}": This component has no parent.`);
  }
}

/**
 * Error thrown when an invalid locator string is provided.
 * Extends PlaywrightFrappeError for locator validation errors.
 */
export class InvalidLocatorError extends PlaywrightFrappeError {
  /**
   * Creates a new instance of InvalidLocatorError.
   * @param locatorString - The invalid locator string that was provided.
   * @param reason - Additional reason for why the locator is invalid (optional).
   */
  constructor(locatorString: string, reason?: string) {
    const message = reason
      ? `Invalid locator string "${locatorString}": ${reason}`
      : `Invalid locator string: "${locatorString}"`;
    super(message);
  }
}

/**
 * Error thrown when attempting to modify a locator string that has already been set.
 * Extends PlaywrightFrappeError for immutability-specific errors.
 */
export class LocatorImmutabilityError extends PlaywrightFrappeError {
  /**
   * Creates a new instance of LocatorImmutabilityError.
   * @param componentName - Name of the component where the modification was attempted.
   * @param currentValue - The current value of the locator string.
   * @param attemptedValue - The value that was attempted to be set.
   */
  constructor(componentName: string, currentValue: string, attemptedValue: string) {
    super(
      `Cannot modify locator string in component "${componentName}". ` +
        `Current value: "${currentValue}", attempted value: "${attemptedValue}". ` +
        `Locator strings are immutable once set.`,
    );
  }
}

/**
 * Error thrown when trying to interact with a disabled component.
 * Extends PlaywrightFrappeError for component state-specific errors.
 */
export class ComponentDisabledError extends PlaywrightFrappeError {
  /**
   * Creates a new instance of ComponentDisabledError.
   * @param componentName - Name of the component that is disabled.
   * @param action - The action that was attempted (optional).
   */
  constructor(componentName: string, action?: string) {
    const actionText = action ? ` perform action "${action}"` : ' perform action';
    super(`Cannot${actionText}: Component "${componentName}" is disabled.`);
  }
}

/**
 * Error thrown when selection operations fail in selectable components.
 * Extends PlaywrightFrappeError for selection-specific errors.
 */
export class SelectionError extends PlaywrightFrappeError {
  /**
   * Creates a new instance of SelectionError.
   * @param componentName - Name of the component where selection failed.
   * @param operation - The selection operation that failed.
   * @param details - Additional details about the error (optional).
   */
  constructor(componentName: string, operation: string, details?: string) {
    const detailsText = details ? `: ${details}` : '';
    super(`Selection failed in component "${componentName}" during ${operation}${detailsText}`);
  }

  /**
   * Creates a SelectionError for when no options are available.
   * @param componentName - Name of the component.
   * @returns SelectionError instance.
   */
  static noOptionsAvailable(componentName: string): SelectionError {
    return new SelectionError(componentName, 'option selection', 'No options available to select');
  }

  /**
   * Creates a SelectionError for when an option key is not found.
   * @param componentName - Name of the component.
   * @param key - The key that was not found.
   * @param availableKeys - Array of available keys.
   * @returns SelectionError instance.
   */
  static optionKeyNotFound(
    componentName: string,
    key: string,
    availableKeys: string[],
  ): SelectionError {
    return new SelectionError(
      componentName,
      'key selection',
      `Option with key "${key}" not found. Available keys: ${availableKeys.join(', ')}`,
    );
  }

  /**
   * Creates a SelectionError for when an option index is out of range.
   * @param componentName - Name of the component.
   * @param index - The index that was out of range.
   * @param maxIndex - The maximum valid index.
   * @returns SelectionError instance.
   */
  static indexOutOfRange(componentName: string, index: number, maxIndex: number): SelectionError {
    return new SelectionError(
      componentName,
      'index selection',
      `Option index ${index} is out of range. Available indices: 0-${maxIndex}`,
    );
  }

  /**
   * Creates a SelectionError for invalid value types.
   * @param componentName - Name of the component.
   * @param receivedType - The type that was received.
   * @returns SelectionError instance.
   */
  static invalidValueType(componentName: string, receivedType: string): SelectionError {
    return new SelectionError(
      componentName,
      'value validation',
      `Value must be a string (key), number (index), or undefined (random). Received: ${receivedType}`,
    );
  }

  /**
   * Creates a SelectionError for when original value cannot be found.
   * @param componentName - Name of the component.
   * @param targetKey - The target key that couldn't be resolved.
   * @returns SelectionError instance.
   */
  static originalValueNotFound(componentName: string, targetKey: string): SelectionError {
    return new SelectionError(
      componentName,
      'value resolution',
      `Could not find original value for key "${targetKey}"`,
    );
  }
}
