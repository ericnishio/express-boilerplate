// @flow

import request from 'supertest'

import createTestServer from '../createTestServer'

describe('home', () => {
  let server

  beforeAll(() => {
    server = createTestServer()
  })

  afterAll(() => {
    server.close()
  })

  it('should get home', async () => {
    const response = await request(server).get('/')

    expect(response.body).toEqual({message: 'Hello world!'})
  })
})
