import { ENV } from './env';

/**
 * Centralized URL configuration for the application.
 *
 * Provides static readonly properties for all application URLs, organized by category.
 * All URLs are constructed from the base environment configuration to ensure consistency
 * across different deployment environments.
 *
 * @class URLs
 */
export class URLs {
  /**
   * The base URL constructed from environment configuration.
   * @private
   * @static
   * @readonly
   * @type {string}
   */
  private static readonly URL: string = ENV.CONCATENATED_URL;

  // Authentication URLs
  /**
   * URL for the login page.
   * @static
   * @readonly
   * @type {string}
   */
  public static readonly LOGIN_URL: string = `${this.URL}/login`;

  /**
   * Base URL for the main application area.
   * @static
   * @readonly
   * @type {string}
   */
  public static readonly BASE_URL: string = `${this.URL}/app`;

  // General application module URLs
  /**
   * URL for the home module/dashboard.
   * @static
   * @readonly
   * @type {string}
   */
  public static readonly MOD_HOME: string = `${this.BASE_URL}/home`;

  /**
   * URL for the applications module.
   * @static
   * @readonly
   * @type {string}
   */
  public static readonly MOD_APPS: string = `${this.BASE_URL}s`;

  /**
   * URL for the users module.
   * @static
   * @readonly
   * @type {string}
   */
  public static readonly MOD_USERS: string = `${this.BASE_URL}/users`;
}
