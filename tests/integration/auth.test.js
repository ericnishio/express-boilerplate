// @flow

import request from 'supertest'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import ms from 'ms'

import User from '$db/models/User'
import createTestServer from '../createTestServer'
import {register, login, defaultUser} from '../helpers'

describe('auth', () => {
  let server

  beforeAll(async () => {
    server = await createTestServer()
  })

  afterAll(async () => {
    server.close()

    await User.collection.drop()

    mongoose.connection.close()
  })

  it('should register new user', async () => {
    const response = await register(server)

    expect(response.status).toEqual(201)
  })

  it('should fail when registering with existing username', async () => {
    const credentials = {
      username: 'john',
      password: 'foobarbazqux',
    }

    await register(server, credentials)

    const response = await register(server, credentials)

    expect(response.status).toEqual(400)
  })

  it('should log in', async () => {
    const response = await login(server)

    expect(response.status).toEqual(200)
    expect(response.body.jwt).toBeDefined()
  })

  it('should fail to log in', async () => {
    const response = await login(server, {...defaultUser, password: 'myIncorrectPassword'})

    expect(response.status).toEqual(401)
  })

  it('should verify access token', async () => {
    const loginResponse = await login(server)

    const accessToken = loginResponse.body.jwt

    const verifyResponse = await request(server)
      .get('/auth/verify')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(verifyResponse.status).toEqual(200)
  })

  it('should fail to verify incorrect access token', async () => {
    const fakeAccessToken = await jwt.sign({
      user: {
        _id: 'foo',
        username: defaultUser.username,
      },
      expires: +new Date() + ms('1 day'),
      refresh: 'fakeRefreshToken',
    }, 'incorrect_secret_123')

    const verifyResponse = await request(server)
      .get('/auth/verify')
      .set('Authorization', `Bearer ${fakeAccessToken}`)

    expect(verifyResponse.status).toEqual(401)
  })

  it('should refresh access token', async () => {
    const loginResponse = await login(server)

    const accessToken = loginResponse.body.jwt

    const refreshResponse = await request(server)
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(refreshResponse.status).toEqual(201)
    expect(refreshResponse.body.jwt).toBeDefined()
  })

  it('should fail to refresh access token', async () => {
    const fakeAccessToken = await jwt.sign({
      user: {
        _id: 'foo',
        username: defaultUser.username,
      },
      expires: +new Date() + ms('1 day'),
      refresh: 'fakeRefreshToken',
    }, 'incorrect_secret_123')

    const refreshResponse = await request(server)
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${fakeAccessToken}`)

    expect(refreshResponse.status).toEqual(401)
  })
})
