// @flow

import type {DbUser} from '$db/models/User'

export type AccessToken = {
  user: DbUser,
  refresh: string,
  expires: number,
}
