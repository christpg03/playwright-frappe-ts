import { IFillable } from './IFillable.js';

/**
 * Interface for components that support auto-fill functionality
 */
export interface IAutoFillable extends IFillable {
  autoFill(): Promise<string>;
}
