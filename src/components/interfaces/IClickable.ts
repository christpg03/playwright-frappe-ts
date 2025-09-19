/**
 * Interface for components that can be clicked.
 *
 * Provides click functionality for interactive UI components such as buttons,
 * links, or any clickable elements. Components implementing this interface
 * support user interaction through click events.
 *
 * @interface IClickable
 */
export interface IClickable {
  /**
   * Performs a click action on the component.
   *
   * Simulates a user click interaction with the component, triggering any
   * associated click handlers or navigation actions.
   *
   * @returns {Promise<void>} A promise that resolves when the click operation is complete.
   */
  click(): Promise<void>;
}
