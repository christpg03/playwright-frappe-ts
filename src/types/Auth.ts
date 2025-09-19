/**
 * Represents user authentication credentials.
 *
 * Contains the basic authentication information required for user login,
 * including username and password credentials.
 *
 * @interface Credentials
 */
export interface Credentials {
  /**
   * The username for authentication.
   * @type {string}
   */
  username: string;

  /**
   * The password for authentication.
   * @type {string}
   */
  password: string;
}

/**
 * Provider interface for retrieving authentication credentials by user role.
 *
 * Defines a contract for authentication providers that can supply credentials
 * based on user roles. This allows for role-based credential management in
 * testing scenarios or multi-user environments.
 *
 * @interface AuthProvider
 */
export interface AuthProvider {
  /**
   * Retrieves authentication credentials for a specific user role.
   *
   * Returns the appropriate username and password combination for the
   * specified role, enabling role-based authentication in tests or applications.
   *
   * @param {string} role - The user role for which to retrieve credentials.
   * @returns {Credentials} The credentials object containing username and password for the role.
   */
  getCredentialsByRole(role: string): Credentials;
}
