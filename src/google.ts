import axios from "axios";
import qs from "querystring";
import { BaseOAuth2, IConstructor } from "./base";

interface AccessTokenResults {
  access_token: string;
  scope: string;
  token_type: string;
  id_token: string;
  expires_in: number;
}

interface UserinfoResults {
  id: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  verified_email: boolean;
}

export class GoogleOAuth2 extends BaseOAuth2 {
  constructor(options: IConstructor) {
    super(options);
  }

  GenerateUrl() {
    const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const response_type = "code";
    const scope = [
      "openid",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    return (
      baseUrl +
      `?scope=${scope}` +
      `&response_type=${response_type}` +
      `&client_id=${this.client_id}` +
      `&redirect_uri=${this.redirect_uri}`
    );
  }

  async GetAccessToken(code: string): Promise<AccessTokenResults> {
    try {
      const payload = {
        code,
        client_id: this.client_id,
        client_secret: this.client_secret,
        redirect_uri: this.redirect_uri,
        grant_type: "authorization_code",
      };
      const { data } = await axios({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: "https://oauth2.googleapis.com/token",
        data: qs.stringify(payload),
      });

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async GetProfile(access_token: string): Promise<UserinfoResults> {
    try {
      const { data } = await axios({
        url: "https://www.googleapis.com/oauth2/v1/userinfo",
        params: {
          alt: "json",
          access_token,
        },
      });

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
