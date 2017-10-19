// @flow

import 'babel-polyfill'
import http from 'http'
import request from 'supertest'
import mongoose from 'mongoose'

import createApp from '$app/createApp'

import type {Server} from 'http'
import type {$Application} from 'express'
import type {Credentials} from '$modules/auth/types'

class TestServer {
  server: Server

  constructor(app: $Application) {
    this.server = http.createServer(app)
  }

  closeServer = () =>
    new Promise((resolve) => this.server.close(resolve))

  closeDb = () =>
    new Promise((resolve) => mongoose.connection.close(resolve))

  request = () =>
    request(this.server)

  register = (credentials: Credentials = defaultUser) =>
    this.request()
      .post('/auth/register')
      .send(credentials)

  login = (credentials: Credentials = defaultUser) =>
    this.request()
      .post('/auth/login')
      .send(credentials)

  destroy = async () => {
    await this.closeDb()
    await this.closeServer()
  }
}

export const defaultUser = {
  username: 'eric',
  password: 'foobarbaz',
}

export default async (): Promise<TestServer> => {
  const app = await createApp()

  return new TestServer(app)
}
