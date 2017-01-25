// @flow

import request from 'supertest'

import createTestServer from '../createTestServer'

describe('general', () => {
  let server

  beforeAll(() => {
    server = createTestServer()
  })

  afterAll(() => {
    server.close()
  })

  it('should fetch greeting', async () => {
    const response = await request(server).get('/')

    expect(response.body).toEqual({message: 'Well, what do we have here? You must be a new arrival.'})
  })

  it('should post message', async () => {
    const payload = {
      author: 'Andre of Astora',
      message: 'Need anything forged?',
    }

    const response = await request(server).post('/contact').send(payload)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(payload)
  })
})
