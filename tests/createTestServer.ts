import 'babel-polyfill'
import http from 'http'
import request from 'supertest'
import mongoose from 'mongoose'

import createApp from '../src/app/createApp'

import {Server} from 'http'
import {Application} from 'express'
import {Credentials} from '../src/modules/auth/types'

class TestServer {
  public server: Server

  constructor(app: Application) {
    this.server = http.createServer(app)
  }

  public closeServer = () =>
    new Promise((resolve) => this.server.close(resolve))

  public closeDb = () =>
    new Promise((resolve) => mongoose.connection.close(resolve))

  public request = () =>
    request(this.server)

  public registerAs = (credentials: Credentials = defaultUser) =>
    this.request()
      .post('/auth/register')
      .send(credentials)

  public loginAs = (credentials: Credentials = defaultUser) =>
    this.request()
      .post('/auth/login')
      .send(credentials)

  public requestAs = async (credentials: Credentials = defaultUser) => {
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

  public destroy = async () => {
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
