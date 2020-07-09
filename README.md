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

## Supported providers

- Google
- Facebook
- PayPal

> Other provders will be updated soon.

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
app.get('/login/google/return', async (req, res, err) => {
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
  client_id: string,
  client_secret: string,
  redirect_uri: string,
})
```

#### googleOAuth2.GenerateUrl()

```ts
const url = googleOAuth2.GenerateUrl()
```

#### googleOAuth2.GetAccessToken()

```ts
const data = await googleOAuth2.GetAccessToken(code)
```

| key          | type   | e.g.     |
| ------------ | ------ | -------- |
| access_token | String | "..."    |
| scope        | String | "..."    |
| id_token     | String | "..."    |
| token_type   | String | "Bearer" |
| expires_in   | Number | 3938     |

#### googleOAuth2.GetProfile()

```ts
const userinfo = await googleOAuth2.GetProfile(access_token)
```

| key            | type    | e.g.                     |
| -------------- | ------- | ------------------------ |
| id             | String  | ""                       |
| email          | String  | "peterkimzz69@gmail.com" |
| name           | String  | "Peter Kim"              |
| given_name     | String  | "Peter"                  |
| family_name    | String  | "Kim"                    |
| picture        | String  | "https://..."            |
| locale         | String  | "en"                     |
| verified_email | Boolean | true                     |

### FacebookOAuth2

```ts
const facebookOAuth2 = new FacebookOAuth2({
  client_id: '',
  client_secret: '',
  redirect_uri: '',
})
```

#### facebookOAuth2.GenerateUrl()

```ts
const url = facebookOAuth2.GenerateUrl()
```

#### facebookOAuth2.GetAccessToken()

```ts
const data = await facebookOAuth2.GetAccessToken(code)
```

| key          | type   | e.g.     |
| ------------ | ------ | -------- |
| access_token | String | "EA..."  |
| token_type   | String | "Bearer" |
| expires_in   | Number | 3938     |

#### facebookOAuth2.GetProfile()

```ts
const userinfo = await facebookOAuth2.GetProfile(access_token)
```

| key        | type    | e.g.                     |
| ---------- | ------- | ------------------------ |
| id         | String  | ""                       |
| name       | String  | "Peter Kim"              |
| first_name | String  | "Peter"                  |
| last_name  | String  | "Kim"                    |
| email      | String? | "peterkimzz69@gmail.com" |

### PaypalOAuth2

Paypal Rest API supports production and sandbox environments.

You should set different values by the environments.

```ts
const paypalOAuth2 = new PaypalOAuth2({
  client_id: '',
  client_secret: '',
  redirect_uri: '',
  production: true | false,
})
```

#### paypalOAuth2.GenerateUrl()

```ts
const url = paypalOAuth2.GenerateUrl()
```

#### paypalOAuth2.GetAccessToken()

```ts
const data = await paypalOAuth2.GetAccessToken(code)
```

| key           | type   | e.g.     |
| ------------- | ------ | -------- |
| access_token  | String | "..."    |
| refresh_token | String | "..."    |
| token_type    | String | "Bearer" |
| nonce         | String | ""       |
| expires_in    | Number | 3938     |

#### paypalOAuth2.GetProfile()

```ts
const userinfo = await paypalOAuth2.GetProfile(access_token)
```

| key              | type    | e.g.                                            |
| ---------------- | ------- | ----------------------------------------------- |
| user_id          | String  | "".                                             |
| payer_id         | String  | ""                                              |
| name             | String  | "Peter Kim"                                     |
| verified_account | Boolean | true                                            |
| emails           | Array   | [{ value: "", primary: true, confirmed: true }] |
