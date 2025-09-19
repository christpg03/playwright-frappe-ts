/**
 * Interface for components that can be filled with text values
 */
export interface IFillable {
  fill(value: string): Promise<void>;
  clear(): Promise<void>;
  getValue(): Promise<string>;
}
