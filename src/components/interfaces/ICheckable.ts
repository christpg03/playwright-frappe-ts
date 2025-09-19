/**
 * Interface for components that can be checked/unchecked.
 *
 * Provides functionality for components with binary state such as checkboxes,
 * radio buttons, or toggle switches. Components implementing this interface
 * support checking, unchecking, toggling, and state querying operations.
 *
 * @interface ICheckable
 */
export interface ICheckable {
  /**
   * Sets the component to a checked state.
   *
   * If the component is already checked, this operation should be idempotent.
   *
   * @returns {Promise<void>} A promise that resolves when the check operation is complete.
   */
  check(): Promise<void>;

  /**
   * Sets the component to an unchecked state.
   *
   * If the component is already unchecked, this operation should be idempotent.
   *
   * @returns {Promise<void>} A promise that resolves when the uncheck operation is complete.
   */
  uncheck(): Promise<void>;

  /**
   * Toggles the component's checked state.
   *
   * Changes from checked to unchecked or vice versa, depending on the current state.
   *
   * @returns {Promise<void>} A promise that resolves when the toggle operation is complete.
   */
  toggle(): Promise<void>;

  /**
   * Retrieves the current checked state of the component.
   *
   * @returns {Promise<boolean>} A promise that resolves to true if the component is checked, false otherwise.
   */
  isChecked(): Promise<boolean>;
}
