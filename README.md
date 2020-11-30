# Rest OAuth2

No more passport, just use simple REST API for OAuth2.

To use client side is **not recommended**.

_Typescript_ supported.

## Contents

- [Supported providers](#Supported-providers)
- [Installing](#Installing)
- [Usages](#Usages)
- [API](#API)
  - [Google](#GoogleOAuth2)
  - [Facebook](#FacebookOAuth2)
  - [Paypal](#PaypalOAuth2)
  - [Kakao](#KakaoOAuth2)

## Supported providers

- Google
- Facebook
- PayPal
- Kakao (for Korean)

> Other providers will be updated soon.

## Installing

Using npm:

```
$ npm install rest-oauth2
```

Using yarn:

```
$ yarn add rest-oauth2
```

## Usages

This example uses `express`

```ts
import express from 'express'
import { GoogleOAuth2 } from 'rest-oauth2'

const app = express()
const googleOAuth2 = new GoogleOAuth2({
  client_id: 'CLIENT_ID',
  client_secret: 'CLIENT_SECRET',
  redirect_uri: 'http://api.example.com/login/google/return',
})

app.get('/login/google', (req, res) => {
  const url = googleOAuth2.GenerateUrl()
  res.redirect(url)
})
app.get('/login/google/return', async (req, res) => {
  const { code } = req.query

  const { access_token } = await googleOAuth2.GetAccessToken(code)

  const userinfo = await googleOAuth2.GetProfile(access_token)

  // simpliy get user information!
  const email = userinfo.email
  ...
})
```

## API

```ts
import { GoogleOAuth2, FacebookOAuth2, PaypalOAuth2 } from 'rest-oauth2'
```

### GoogleOAuth2

```ts
const googleOAuth2 = new GoogleOAuth2({
  client_id: '',
  client_secret: '',
  redirect_uri: '',
})
```

#### GenerateUrl()

```ts
const url = googleOAuth2.GenerateUrl()
```

#### GetAccessToken()

```ts
const data = await googleOAuth2.GetAccessToken(code)
```

```json
{
  "access_token": "",
  "scope": "",
  "id_token": "",
  "token_type": "Bearer",
  "expires_in": 3938
}
```

#### GetProfile()

```ts
const userinfo = await googleOAuth2.GetProfile(access_token)
```

```json
{
  "id": "",
  "email": "",
  "name": "",
  "given_name": "",
  "family_name": "",
  "picture": "",
  "locale": "en",
  "verified_email": true
}
```

### FacebookOAuth2

```ts
const facebookOAuth2 = new FacebookOAuth2({
  client_id: '',
  client_secret: '',
  redirect_uri: '',
})
```

#### GenerateUrl()

```ts
const url = facebookOAuth2.GenerateUrl()
```

#### GetAccessToken()

```ts
const data = await facebookOAuth2.GetAccessToken(code)
```

```json
{
  "access_token": "",
  "token_type": "Bearer",
  "expires_in": 39312
}
```

#### GetProfile()

```ts
const userinfo = await facebookOAuth2.GetProfile(access_token)
```

```json
{
  "id": "",
  "name": "",
  "first_name": "",
  "last_name": "",
  "email": ""
}
```

### PaypalOAuth2

Paypal Rest API supports production and sandbox environments.

You should set different values by the environments.

```ts
const paypalOAuth2 = new PaypalOAuth2({
  client_id: '',
  client_secret: '',
  redirect_uri: '',
  production: true,
})
```

#### GenerateUrl()

```ts
const url = paypalOAuth2.GenerateUrl()
```

#### GetAccessToken()

```ts
const data = await paypalOAuth2.GetAccessToken(code)
```

```json
{
  "access_token": "",
  "refresh_token": "",
  "token_type": "Bearer",
  "nonce": "",
  "expires_in": 43123
}
```

#### GetProfile()

```ts
const userinfo = await paypalOAuth2.GetProfile(access_token)
```

```json
{
  "user_id": "",
  "payer_id": "",
  "name": "",
  "locality": {
    "locality": "",
    "region": "",
    "country": ""
  },
  "verified_account": true,
  "emails": [
    {
      "value": "",
      "primary": true,
      "confirmed": true
    },
    {
      "value": "",
      "primary": false,
      "confirmed": true
    }
    // ...
  ]
}
```

### KakaoOAuth2

```ts
const kakaoOAuth2 = new KakaoOAuth2({
  client_id: '',
  redirect_uri: '',
})
```

#### GenerateUrl()

```ts
const url = kakaoOAuth2.GenerateUrl()
```

#### GetAccessToken()

```ts
const data = await kakaoOAuth2.GetAccessToken(code)
```

```json
{
  "access_token": "...",
  "token_type": "bearer",
  "refresh_token": "...",
  "expires_in": 21599,
  "scope": "profile",
  "refresh_token_expires_in": 5183999
}
```

#### GetProfile()

```ts
const userinfo = await googleOAuth2.GetProfile(access_token)
```

```json
{
  {
    "id": 100000000,
    "connected_at": "2020-11-30T12:00:00Z",
    "properties": {
        "nickname": "Your name",
        "profile_image": "http://...",
        "thumbnail_image": "http://..."
    },
    "kakao_account": {
        "profile_needs_agreement": false,
        "profile": {
            "nickname": "Your name",
            "thumbnail_image_url": "http://...",
            "profile_image_url": "http://..."
        },
        "has_email": true,
        "email_needs_agreement": true
    }
}
}
```
