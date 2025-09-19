import type { Page } from '@playwright/test';

import { EnableableComponent } from '../abstracts/EnableableComponent';
import { IAutoFillable } from '../interfaces/IAutoFillable';
import { Strategy } from '../../types/Components';

export class LabeledInputComponent extends EnableableComponent implements IAutoFillable {
  private label: string;
  private strategy: Strategy;

  constructor(
    page: Page,
    dataFieldName: string,
    label: string,
    enabled = true,
    strategy: Strategy,
  ) {
    const field_locator = page.locator(`input[data-fieldname="${dataFieldName}"]`);

    super(page, field_locator, enabled);
    this.label = label;
    this.strategy = strategy;
  }

  async fill(value: string): Promise<void> {
    this.throwIfDisabled(`${this.label} input`, 'fill');
    await this.locator.fill(value);
  }

  async clear(): Promise<void> {
    this.throwIfDisabled(`${this.label} input`, 'clear');
    await this.locator.fill('');
  }

  async getValue(): Promise<string> {
    return await this.locator.inputValue();
  }

  async autoFill(...args: any[]): Promise<string> {
    const value = this.strategy(...args);
    await this.fill(value);
    return value;
  }
}
