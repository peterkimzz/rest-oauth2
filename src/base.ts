export interface IConstructor {
  client_id: string
  client_secret: string
  redirect_uri: string
}

export abstract class BaseOAuth2 {
  public client_id: string
  public client_secret: string
  public redirect_uri: string

  constructor(options: IConstructor) {
    this.client_id = options.client_id
    this.client_secret = options.client_secret
    this.redirect_uri = options.redirect_uri
  }

  GenerateUrl() {
    throw new Error('implement required.')
  }

  GetAccessToken(code: string) {
    throw new Error('implement required.')
  }

  GetProfile(access_token: string) {
    throw new Error('implement required.')
  }
}
