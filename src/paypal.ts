import axios from 'axios'
import { BaseOAuth2, IConstructor } from './base'

interface IPaypalConstructor extends IConstructor {
  production?: boolean
}

interface AccessTokenResults {
  nonce: string
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

interface UserinfoResults {
  user_id: string
  name: string
  payer_id: string
  address: {
    locality: string
    region: string
    country: string
  }
  verified_account: boolean
  emails: {
    value: string
    primary: boolean
    confirmed: boolean
  }[]
}

export class PaypalOAuth2 extends BaseOAuth2 {
  readonly production: boolean
  private readonly base_url: string

  constructor(options: IPaypalConstructor) {
    super(options)

    this.production = options.production || false
    this.base_url = this.production
      ? 'https://api.paypal.com'
      : 'https://api.sandbox.paypal.com'
  }

  GenerateUrl(): string {
    const base_url = this.production
      ? 'https://www.paypal.com/connect'
      : 'https://www.sandbox.paypal.com/connect'
    const flow_entry = 'static'
    const scope =
      'openid profile email address https://uri.paypal.com/services/paypalattributes'

    return (
      base_url +
      `?flow_entry=${flow_entry}` +
      `&client_id=${this.client_id}` +
      `&scope=${scope}` +
      `&redirect_uri=${this.redirect_uri}`
    )
  }

  async GetAccessTokenByCode(code: string): Promise<AccessTokenResults> {
    try {
      const { data } = await axios({
        method: 'post',
        url: this.base_url + '/v1/oauth2/token',
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en_US',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: this.client_id,
          password: this.client_secret,
        },
        params: {
          grant_type: 'authorization_code',
          code,
        },
      })

      return data
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async GetProfileByAccessToken(access_token: string): Promise<UserinfoResults> {
    try {
      const { data } = await axios({
        method: 'get',
        url: this.base_url + '/v1/identity/oauth2/userinfo',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          schema: 'paypalv1.1',
        },
      })

      return data
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async GetProfileByCode(code: string) {
    try {
      const { access_token } = await this.GetAccessTokenByCode(code)

      return this.GetProfileByAccessToken(access_token)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
