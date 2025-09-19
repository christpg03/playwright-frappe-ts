/**
 * Interface for components that can be filled with text values.
 *
 * Provides text input functionality for components such as text fields,
 * text areas, or any input elements that accept string values. Components
 * implementing this interface support filling, clearing, and value retrieval.
 *
 * @interface IFillable
 */
export interface IFillable {
  /**
   * Fills the component with the specified text value.
   *
   * Clears any existing content and sets the component's value to the provided string.
   * The exact behavior may vary depending on the component type.
   *
   * @param {string} value - The text value to fill into the component.
   * @returns {Promise<void>} A promise that resolves when the fill operation is complete.
   */
  fill(value: string): Promise<void>;

  /**
   * Clears all content from the component.
   *
   * Removes any existing text or value from the component, leaving it empty.
   *
   * @returns {Promise<void>} A promise that resolves when the clear operation is complete.
   */
  clear(): Promise<void>;

  /**
   * Retrieves the current value of the component.
   *
   * Returns the text content or value currently present in the component.
   *
   * @returns {Promise<string>} A promise that resolves to the current value of the component.
   */
  getValue(): Promise<string>;
}
