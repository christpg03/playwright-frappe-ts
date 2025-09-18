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
