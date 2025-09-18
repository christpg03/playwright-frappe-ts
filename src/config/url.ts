import ENV from './env';

export default class URLs {
  private static readonly URL: string = ENV.CONCATENATED_URL;

  // authentication
  public static readonly LOGIN_URL: string = `${this.URL}/login`;
  public static readonly BASE_URL: string = `${this.URL}/app`;

  // general
  public static readonly MOD_HOME: string = `${this.BASE_URL}/home`;
  public static readonly MOD_APPS: string = `${this.BASE_URL}s`;
  public static readonly MOD_USERS: string = `${this.BASE_URL}/users`;
}
