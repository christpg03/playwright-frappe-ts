/**
 * Interface for components that can be selected from options.
 *
 * Provides selection functionality for components such as dropdowns, select boxes,
 * multi-select lists, or any components that allow choosing from predefined options.
 * Supports both single and multiple selection modes.
 *
 * @interface ISelectable
 */
export interface ISelectable {
  /**
   * Selects one or more options from the component.
   *
   * For single-select components, provide a single string value.
   * For multi-select components, provide an array of strings.
   * The behavior depends on the component's selection mode.
   *
   * @param {string | string[]} value - The option(s) to select. Can be a single value or array of values.
   * @returns {Promise<void>} A promise that resolves when the selection operation is complete.
   */
  select(value: string | string[]): Promise<void>;

  /**
   * Retrieves the currently selected value(s) from the component.
   *
   * Returns a single string for single-select components or an array of strings
   * for multi-select components.
   *
   * @returns {Promise<string | string[]>} A promise that resolves to the selected value(s).
   */
  getSelectedValue(): Promise<string | string[]>;

  /**
   * Retrieves all available options from the component.
   *
   * Returns an array of all selectable options present in the component,
   * regardless of their current selection state.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of all available option values.
   */
  getOptions(): Promise<string[]>;
}
