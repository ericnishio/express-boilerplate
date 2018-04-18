import {Id} from '../../app/types'

export interface Credentials {
  username: string,
  password: string,
}

export interface AccessToken {
  user: {
    _id: Id,
    username: string,
  },
  refresh: string,
  expires: number,
}
