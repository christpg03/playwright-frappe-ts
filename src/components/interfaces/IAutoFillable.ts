import { IFillable } from './IFillable.js';

/**
 * Interface for components that support auto-fill functionality.
 *
 * Extends IFillable to provide automatic value population capabilities.
 * Components implementing this interface can automatically generate and fill
 * themselves with appropriate values without manual input.
 *
 * @interface IAutoFillable
 * @extends {IFillable}
 */
export interface IAutoFillable extends IFillable {
  /**
   * Automatically fills the component with an appropriate value.
   *
   * Generates and sets a suitable value for the component based on its type,
   * context, or predefined rules. The exact behavior depends on the implementing
   * component's auto-fill strategy.
   *
   * @returns {Promise<string>} A promise that resolves to the value that was auto-filled.
   */
  autoFill(): Promise<string>;
}
