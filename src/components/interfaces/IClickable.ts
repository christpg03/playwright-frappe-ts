/**
 * Interface for components that can be clicked
 */
export interface IClickable {
  click(): Promise<void>;
}
