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

  it('should get home', () => {
    return request(server)
      .get('/')
      .expect({message: 'Hello world!'})
  })
})
