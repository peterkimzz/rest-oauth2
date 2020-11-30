import axios from 'axios'
import qs from 'querystring'
import { BaseOAuth2, IConstructor } from './base'

interface KakaoAccessTokenResults {
  token_type: string
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_token_expires_in: number
  scope: string
  id_token: string
}

interface UserinfoResults {
  id: string
  connected_at: string
  properties: {
    nickname: string
    profile_image?: string // 640 * 640
    thumbnail_image?: string // 110 * 110
  }
  kakao_account: {
    profile_needs_agreement: boolean
    email_needs_agreement: boolean
  }
}

export class KakaoOAuth2 extends BaseOAuth2 {
  constructor(options: IConstructor) {
    super(options)
  }

  GenerateUrl() {
    const baseUrl = 'https://kauth.kakao.com/oauth/authorize'
    const response_type = 'code'

    return (
      baseUrl +
      `?client_id=${this.client_id}` +
      `&response_type=${response_type}` +
      `&redirect_uri=${this.redirect_uri}`
    )
  }

  async GetAccessTokenByCode(code: string): Promise<KakaoAccessTokenResults> {
    try {
      const payload = {
        code,
        client_id: this.client_id,
        redirect_uri: this.redirect_uri,
        grant_type: 'authorization_code',
      }
      const { data } = await axios({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: 'https://kauth.kakao.com/oauth/token',
        data: qs.stringify(payload),
      })

      return data
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async GetProfileByAccessToken(
    access_token: string
  ): Promise<UserinfoResults> {
    try {
      const { data } = await axios({
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${access_token}`,
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
