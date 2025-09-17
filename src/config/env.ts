import { config } from 'dotenv';

config();

/**
 * Env class provides static accessors for environment variables used throughout the application.
 * It loads variables using dotenv and exposes them as static readonly properties.
 *
 * - Handles type conversion for numbers and booleans where appropriate.
 * - Provides utility methods for cleaning and retrieving environment variables.
 * - Intended for use as a central configuration point for environment-dependent values.
 *
 * Example usage:
 *   const domain = Env.DOMAIN;
 *   const timeout = Env.PAGE_LOAD_TIMEOUT;
 */
export default class Env {
  /**
   * Cleans a URL string by replacing encoded colons (\x3a) with ':'
   * @param url - The URL string to clean
   * @returns The cleaned URL string
   */
  private static cleanUrl(url: string): string {
    return url ? url.replace(/\\x3a/g, ':') : '';
  }

  /**
   * Retrieves an environment variable by name, returning an empty string if not set.
   * @param name - The name of the environment variable
   * @returns The value of the environment variable or an empty string
   */
  private static getEnvVar(name: string): string {
    const value: string = process.env[name] || '';
    return value;
  }

  // common environment URLs
  public static readonly ENV: string = Env.getEnvVar('ENV');
  public static readonly DOMAIN: string = Env.getEnvVar('DOMAIN');
  public static readonly CONCATENATED_URL: string =
    Env.cleanUrl(Env.getEnvVar('ENV')) + Env.cleanUrl(Env.getEnvVar('DOMAIN'));

  public static readonly BROWSER: string = Env.getEnvVar('BROWSER');
  public static readonly HEADLESS: string = Env.getEnvVar('HEADLESS');
  public static readonly DEBUG_MODE: number = parseInt(Env.getEnvVar('DEBUG_MODE')) || 0;

  public static readonly PAGE_LOAD_TIMEOUT: number =
    parseInt(Env.getEnvVar('PAGE_LOAD_TIMEOUT')) || 60000;
  public static readonly OBJECT_LOAD_TIMEOUT: number =
    parseInt(Env.getEnvVar('OBJECT_LOAD_TIMEOUT')) || 10000;

  /* // TODO
  public static readonly ERASE_COOKIES_AFTER_TESTING: boolean =
    Env.getEnvVar('ERASE_COOKIES_AFTER_TESTING') === 'true' ||
    Env.getEnvVar('ERASE_COOKIES_AFTER_TESTING') === undefined;
  
  
  // experimental environment URLs
  //      translation variables
  public static readonly COMPANY_NAME: string = Env.getEnvVar('COMPANY_NAME') || '';
  public static readonly PROJECTS: Array<any> = (() => {
    try {
      const projectsEnv = Env.getEnvVar('PROJECTS');
      const parsed = projectsEnv ? JSON.parse(projectsEnv) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  })();
  public static readonly BRANCH: string = Env.getEnvVar('BRANCH') || '';
  public static readonly CSV_LANGUAGE_PATH: unknown = (() => {
    try {
      const envValue = Env.getEnvVar('CSV_LANGUAGE_PATH');
      return envValue ? JSON.parse(envValue) : [];
    } catch {
      return [];
    }
  })();
  //      GitHub integration
  public static readonly GITHUB_TOKEN: string = Env.getEnvVar('GITHUB_TOKEN') || '';
  //      path log
  public static readonly PATH_LOG: string = Env.getEnvVar('PATH_LOG') || 'logs';
  */
}
