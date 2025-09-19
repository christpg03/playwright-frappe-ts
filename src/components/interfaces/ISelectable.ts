/**
 * Interface for components that can be selected from options
 */
export interface ISelectable {
  select(value: string | string[]): Promise<void>;
  getSelectedValue(): Promise<string | string[]>;
  getOptions(): Promise<string[]>;
}
