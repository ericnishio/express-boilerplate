// @flow

import jwt from 'jsonwebtoken'
import ms from 'ms'

import createTestServer, {defaultUser} from '../createTestServer'

describe('auth', () => {
  let server

  beforeAll(async () => {
    server = await createTestServer()
  })

  afterAll(async () => {
    await server.destroy()
  })

  test('register new user', async () => {
    const response = await server.register()

    expect(response.status).toEqual(201)
  })

  test('fail when registering with existing username', async () => {
    const credentials = {
      username: 'john',
      password: 'foobarbazqux',
    }

    await server.register(credentials)

    const response = await server.register(credentials)

    expect(response.status).toEqual(400)
  })

  test('log in', async () => {
    const response = await server.login()

    expect(response.status).toEqual(200)
    expect(response.body.jwt).toBeDefined()
  })

  test('fail to log in', async () => {
    const response = await server.login({...defaultUser, password: 'myIncorrectPassword'})

    expect(response.status).toEqual(401)
  })

  test('verify access token', async () => {
    const loginResponse = await server.login()

    const accessToken = loginResponse.body.jwt

    const verifyResponse = await server.request()
      .get('/auth/verify')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(verifyResponse.status).toEqual(200)
  })

  test('fail to verify incorrect access token', async () => {
    const fakeAccessToken = await jwt.sign({
      user: {
        _id: 'foo',
        username: defaultUser.username,
      },
      expires: +new Date() + ms('1 day'),
      refresh: 'fakeRefreshToken',
    }, 'incorrect_secret_123')

    const verifyResponse = await server.request()
      .get('/auth/verify')
      .set('Authorization', `Bearer ${fakeAccessToken}`)

    expect(verifyResponse.status).toEqual(401)
  })

  test('refresh access token', async () => {
    const loginResponse = await server.login()

    const accessToken = loginResponse.body.jwt

    const refreshResponse = await server.request()
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(refreshResponse.status).toEqual(201)
    expect(refreshResponse.body.jwt).toBeDefined()
  })

  test('fail to refresh access token', async () => {
    const fakeAccessToken = await jwt.sign({
      user: {
        _id: 'foo',
        username: defaultUser.username,
      },
      expires: +new Date() + ms('1 day'),
      refresh: 'fakeRefreshToken',
    }, 'incorrect_secret_123')

    const refreshResponse = await server.request()
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${fakeAccessToken}`)

    expect(refreshResponse.status).toEqual(401)
  })
})
