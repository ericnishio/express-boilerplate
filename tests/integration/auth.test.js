// @flow

import request from 'supertest'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import User from '$db/models/User'
import createTestServer from '../createTestServer'

const eric = {
  username: 'eric',
  password: 'foobarbaz',
}

describe('auth', () => {
  let server

  beforeAll(async () => {
    await User.collection.drop()
    server = await createTestServer()
  })

  afterAll(() => {
    server.close()
    mongoose.connection.close()
  })

  it('should register new user', async () => {
    const response = await request(server)
      .post('/auth/register')
      .send(eric)

    expect(response.status).toEqual(201)
  })

  it('should fail when registering with existing username', async () => {
    const credentials = {
      username: 'john',
      password: 'foobarbazqux',
    }

    await request(server)
      .post('/auth/register')
      .send(credentials)

    const response = await request(server)
      .post('/auth/register')
      .send(credentials)

    expect(response.status).toEqual(400)
  })

  it('should log in', async () => {
    const response = await request(server)
      .post('/auth/login')
      .send(eric)

    expect(response.status).toEqual(200)
    expect(response.body.jwt).toBeDefined()
  })

  it('should fail to log in', async () => {
    const response = await request(server)
      .post('/auth/login')
      .send({...eric, password: 'myIncorrectPassword'})

    expect(response.status).toEqual(401)
  })

  it('should verify access token', async () => {
    const loginResponse = await request(server)
      .post('/auth/login')
      .send(eric)

    const accessToken = loginResponse.body.jwt

    const verifyResponse = await request(server)
      .get('/auth/verify')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(verifyResponse.status).toEqual(200)
  })

  it('should fail to verify incorrect access token', async () => {
    const fakeAccessToken = await jwt.sign({
      user: eric,
      expires: +new Date() + 1000,
      refresh: 'fakeRefreshToken',
    }, 'incorrect_secret_123')

    const verifyResponse = await request(server)
      .get('/auth/verify')
      .set('Authorization', `Bearer ${fakeAccessToken}`)

    expect(verifyResponse.status).toEqual(401)
  })

  it('should refresh access token', async () => {
    const loginResponse = await request(server)
      .post('/auth/login')
      .send(eric)

    const accessToken = loginResponse.body.jwt

    const refreshResponse = await request(server)
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(refreshResponse.status).toEqual(201)
    expect(refreshResponse.body.jwt).toBeDefined()
  })

  it('should fail to refresh access token', async () => {
    const fakeAccessToken = await jwt.sign({
      user: eric,
      expires: +new Date() + 1000,
      refresh: 'fakeRefreshToken',
    }, 'incorrect_secret_123')

    const refreshResponse = await request(server)
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${fakeAccessToken}`)

    expect(refreshResponse.status).toEqual(401)
  })
})
