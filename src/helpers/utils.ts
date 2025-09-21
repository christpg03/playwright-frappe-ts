/**
 * Cleans a URL by replacing encoded colon characters with actual colons.
 *
 * This function is useful for processing URLs that may have had their colons
 * encoded as \x3a (hexadecimal escape sequence).
 *
 * @param url - The URL string to clean
 * @returns The cleaned URL with colons restored, or empty string if input is falsy
 *
 * @example
 * ```typescript
 * cleanUrl('https\\x3a//example.com') // Returns 'https://example.com'
 * cleanUrl('') // Returns ''
 * cleanUrl(null) // Returns ''
 * ```
 */
export function cleanUrl(url: string): string {
  return url ? url.replace(/\\x3a/g, ':') : '';
}

/**
 * Converts a string to lowercase snake_case format.
 *
 * This function transforms various string formats (camelCase, PascalCase, spaces, etc.)
 * into lowercase snake_case by replacing spaces with underscores, converting uppercase
 * letters to lowercase with preceding underscores, and cleaning up multiple underscores.
 *
 * @param str - The string to convert to snake_case
 * @returns The converted string in lowercase snake_case format
 *
 * @example
 * ```typescript
 * toLowerSnakeCase('HelloWorld') // Returns 'hello_world'
 * toLowerSnakeCase('camelCaseString') // Returns 'camel_case_string'
 * toLowerSnakeCase('My Test String') // Returns 'my_test_string'
 * toLowerSnakeCase('PascalCaseExample') // Returns 'pascal_case_example'
 * toLowerSnakeCase('already_snake_case') // Returns 'already_snake_case'
 * ```
 */
export function toLowerSnakeCase(str: string): string {
  return str
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) // Convert camelCase
    .replace(/^_/, '') // Remove leading underscore
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .toLowerCase();
}
