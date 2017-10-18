// @flow

import type {DbUser} from '$db/models/User'

export type Credentials = {
  username: string,
  password: string,
}

export type AccessToken = {
  user: DbUser,
  refresh: string,
  expires: number,
}
