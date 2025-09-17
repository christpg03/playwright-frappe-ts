import { Page } from 'playwright';

/**
 * Espera a que un atributo de un elemento tenga un valor específico
 * @param page - The Playwright page object representing the browser page.
 * @param selector - The selector for the element to check.
 * @param attr - The attribute to check.
 * @param expected - The expected value of the attribute.
 */
export async function waitForAttributeValue(
  page: Page,
  selector: string,
  attr: string,
  expected: string,
): Promise<void> {
  await page.waitForFunction(
    (args: { selector: string; attr: string; expected: string }) => {
      const el = document.querySelector(args.selector);
      return el?.getAttribute(args.attr) === args.expected;
    },
    { selector, attr, expected },
  );
}
