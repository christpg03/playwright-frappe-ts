/**
 * Interface for components that can be checked/unchecked
 */
export interface ICheckable {
  check(): Promise<void>;
  uncheck(): Promise<void>;
  toggle(): Promise<void>;
  isChecked(): Promise<boolean>;
}
