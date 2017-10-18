// @flow

import request from 'supertest'

import type {Server} from 'http'
import type {Credentials} from '$modules/auth/types'

export const defaultUser = {
  username: 'eric',
  password: 'foobarbaz',
}

export const register = (server: Server, credentials: Credentials = defaultUser) =>
  request(server)
    .post('/auth/register')
    .send(credentials)

export const login = (server: Server, credentials: Credentials = defaultUser) =>
  request(server)
    .post('/auth/login')
    .send(credentials)
