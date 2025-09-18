import { config } from 'dotenv';
import envalid, { str, num, bool } from 'envalid';

import { cleanUrl } from '../helpers/utils';

config();

/**
 * Base environment variables validation schema using envalid
 * Validates and provides defaults for core application configuration
 */
const baseEnv = envalid.cleanEnv(process.env, {
  ENV: str(),
  DOMAIN: str(),
  BROWSER: str({ choices: ['chromium', 'firefox', 'webkit'], default: 'chromium' }),
  HEADLESS: bool({ default: true }),
  DEBUG_MODE: num({ choices: [0, 1, 2], default: 0 }),
  PAGE_LOAD_TIMEOUT: num({ default: 60000 }),
  OBJECT_LOAD_TIMEOUT: num({ default: 10000 }),
});

/**
 * Extended environment type that includes computed properties
 * @typedef {Object} CustomEnv
 * @property {string} CONCATENATED_URL - Combined and cleaned URL from ENV and DOMAIN
 */
type CustomEnv = typeof baseEnv & {
  CONCATENATED_URL: string;
};

/**
 * Main environment configuration object
 * Combines validated base environment variables with computed properties
 *
 * @description Provides access to all environment variables with proper validation
 * and includes a concatenated URL built from ENV and DOMAIN values
 *
 * @example
 * ```typescript
 * import ENV from './config/env';
 *
 * console.log(ENV.BROWSER); // 'chromium' | 'firefox' | 'webkit'
 * console.log(ENV.CONCATENATED_URL); // Clean URL combining ENV + DOMAIN
 * ```
 */
export const ENV: CustomEnv = {
  ...baseEnv,
  CONCATENATED_URL: cleanUrl(baseEnv.ENV + baseEnv.DOMAIN),
};
