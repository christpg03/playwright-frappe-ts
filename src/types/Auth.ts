export interface Credentials {
  username: string;
  password: string;
}

export interface AuthProvider {
  getCredentialsByRole(role: string): Credentials;
}
