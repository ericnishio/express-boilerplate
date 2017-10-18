// @flow

import type {Id} from '$app/types'

export type Credentials = {
  username: string,
  password: string,
}

export type AccessToken = {
  user: {
    _id: Id,
    username: string,
  },
  refresh: string,
  expires: number,
}
