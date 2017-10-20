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

  registerAs = (credentials: Credentials = defaultUser) =>
    this.request()
      .post('/auth/register')
      .send(credentials)

  loginAs = (credentials: Credentials = defaultUser) =>
    this.request()
      .post('/auth/login')
      .send(credentials)

  requestAs = async (credentials: Credentials = defaultUser) => {
    const response = await this.loginAs(credentials)
    const bearer = `Bearer ${response.body.jwt}`

    return {
      get: (route) => this.request().get(route).set('Authorization', bearer),
      post: (route) => this.request().post(route).set('Authorization', bearer),
      put: (route) => this.request().put(route).set('Authorization', bearer),
      delete: (route) => this.request().delete(route).set('Authorization', bearer),
      patch: (route) => this.request().patch(route).set('Authorization', bearer),
    }
  }

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
