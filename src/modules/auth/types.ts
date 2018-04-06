import {Id} from '../../app/types'

export interface ICredentials {
  username: string,
  password: string,
}

export interface IAccessToken {
  user: {
    _id: Id,
    username: string,
  },
  refresh: string,
  expires: number,
}
