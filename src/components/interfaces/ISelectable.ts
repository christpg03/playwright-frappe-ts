/**
 * Interface for components that can be selected from options.
 *
 * Provides selection functionality for components such as dropdowns, select boxes,
 * and other components that allow choosing from predefined options.
 * This interface is designed for single-select components.
 *
 * @interface ISelectable
 */
export interface ISelectable {
  /**
   * Selects an option from the component.
   *
   * @param {string | number} [value] - The option to select. Can be:
   *   - A string: the lower_snake_case key of the option
   *   - A number: the index of the option (0-based)
   *   - undefined/null: selects a random option
   * @returns {Promise<void>} A promise that resolves when the selection operation is complete.
   */
  selectValue(value?: string | number): Promise<void>;

  /**
   * Retrieves the currently selected value from the component.
   *
   * Returns the input value of the selected option.
   *
   * @returns {Promise<string>} A promise that resolves to the selected value.
   */
  getSelectedValue(): Promise<string>;

  /**
   * Retrieves all available options from the component.
   *
   * Returns a record mapping lower_snake_case keys to their display text values.
   * Empty options are automatically filtered out.
   *
   * @returns {Promise<Record<string, string>>} A promise that resolves to a record of all available options,
   *   where keys are lower_snake_case versions of option values and values are the display text.
   */
  getOptions(): Promise<Record<string, string>>;
}
