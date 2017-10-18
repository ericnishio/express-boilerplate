// @flow

import request from 'supertest'
import mongoose from 'mongoose'

import createTestServer from '../createTestServer'

describe('post', () => {
  let server

  beforeAll(async () => {
    server = await createTestServer()
  })

  afterAll(() => {
    server.close()
    mongoose.connection.close()
  })

  it('should create post', async () => {
    const post = {
      title: 'Hello World',
      body: 'Welcome to my blog.',
    }

    const response = await request(server)
      .post('/posts')
      .set('Authorization', 'Bearer foobarbaz')
      .send(post)

    expect(response.status).toEqual(201)
  })

  it('should throw 400 when submitting empty post', async () => {
    const post = {}
    const response = await request(server)
      .post('/posts')
      .set('Authorization', 'Bearer foobarbaz')
      .send(post)

    expect(response.status).toEqual(400)
  })

  it('should throw 401 when submitting unauthorized post', async () => {
    const post = {
      title: 'Hello World',
      body: 'Welcome to my blog.',
    }

    const response = await request(server)
      .post('/posts')
      .send(post)

    expect(response.status).toEqual(401)
  })

  it('should fetch post', async () => {
    const post = {
      title: 'Hello World',
      body: 'Welcome to my blog.',
    }

    const createResponse = await request(server)
      .post('/posts')
      .set('Authorization', 'Bearer foobarbaz')
      .send(post)

    const getResponse = await request(server).get(`/posts/${createResponse.body._id}`)

    expect(getResponse.status).toEqual(200)
    expect(getResponse.body.title).toEqual('Hello World')
  })

  it('should throw 404 when fetching nonexistent post', async () => {
    const response = await request(server).get('/posts/foobar')

    expect(response.status).toEqual(404)
  })
})
