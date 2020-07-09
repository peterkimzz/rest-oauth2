import axios from "axios";
import { BaseOAuth2, IConstructor } from "./base";

interface AccessTokenResults {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface UserinfoResults {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email?: string;
}

export class FacebookOAuth2 extends BaseOAuth2 {
  constructor(options: IConstructor) {
    super(options);
  }

  GenerateUrl(): string {
    // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
    const base_url = "https://www.facebook.com/v7.0/dialog/oauth";

    return (
      base_url +
      `?client_id=${this.client_id}` +
      `&redirect_uri=${this.redirect_uri}`
    );
  }

  async GetAccessToken(code: string): Promise<AccessTokenResults> {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://graph.facebook.com/v7.0/oauth/access_token",
        params: {
          code,
          client_id: this.client_id,
          client_secret: this.client_secret,
          redirect_uri: this.redirect_uri,
        },
      });

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async GetProfile(access_token: string): Promise<UserinfoResults> {
    try {
      const fields = [
        "id",
        "email",
        "name",
        "first_name",
        "last_name",
        "link",
      ].join(",");

      const { data } = await axios({
        url: "https://graph.facebook.com/me",
        method: "get",
        params: {
          fields,
          access_token,
        },
      });

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
