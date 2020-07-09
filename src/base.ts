export interface IConstructor {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

export abstract class BaseOAuth2 {
  public client_id: string;
  public client_secret: string;
  public redirect_uri: string;

  constructor(options: IConstructor) {
    this.client_id = options.client_id;
    this.client_secret = options.client_secret;
    this.redirect_uri = options.redirect_uri;
  }

  GenerateUrl() {
    // let baseUrl;
    // let url;
    // switch (this.provider) {
    //   case "google":
    //     baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    //     const response_type = "code";
    //     const scope = [
    //       "openid",
    //       "https://www.googleapis.com/auth/userinfo.email",
    //       "https://www.googleapis.com/auth/userinfo.profile",
    //     ].join(" ");
    //     url =
    //       baseUrl +
    //       `?scope=${scope}&response_type=${response_type}&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}`;
    //     break;
    //   case "facebook":
    //     baseUrl = "https://www.facebook.com/v7.0/dialog/oauth";
    //     break;
    //   case "paypal":
    //     baseUrl = this.production
    //       ? "https://api.paypal.com"
    //       : "https://api.sandbox.paypal.com";
    //     break;
    // }
    // return url;
    throw new Error("implement required.");
  }

  GetAccessToken(code: string) {
    throw new Error("implement required.");
  }

  GetProfile(access_token: string) {
    throw new Error("implement required.");
  }
}
