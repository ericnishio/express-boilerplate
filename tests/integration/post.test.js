// @flow

import request from 'supertest'
import mongoose from 'mongoose'

import Post from '$db/models/Post'
import User from '$db/models/User'
import createTestServer from '../createTestServer'
import {register, login} from '../helpers'

describe('post', () => {
  let server
  let accessToken

  beforeAll(async () => {
    server = await createTestServer()

    await register(server)

    const loginResponse = await login(server)
    accessToken = loginResponse.body.jwt
  })

  afterAll(async () => {
    server.close()

    await Post.collection.drop()
    await User.collection.drop()

    mongoose.connection.close()
  })

  it('create post', async () => {
    const post = {
      title: 'Hello World',
      body: 'Welcome to my blog.',
    }

    const response = await request(server)
      .post('/posts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(post)

    expect(response.status).toEqual(201)
  })

  it('throw 400 when submitting empty post', async () => {
    const post = {}
    const response = await request(server)
      .post('/posts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(post)

    expect(response.status).toEqual(400)
  })

  it('throw 401 when submitting unauthorized post', async () => {
    const post = {
      title: 'Hello World',
      body: 'Welcome to my blog.',
    }

    const response = await request(server)
      .post('/posts')
      .send(post)

    expect(response.status).toEqual(401)
  })

  it('fetch post', async () => {
    const post = {
      title: 'Hello World',
      body: 'Welcome to my blog.',
    }

    const createResponse = await request(server)
      .post('/posts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(post)

    const getResponse = await request(server).get(`/posts/${createResponse.body._id}`)

    expect(getResponse.status).toEqual(200)
    expect(getResponse.body.title).toEqual('Hello World')
  })

  it('throw 404 when fetching nonexistent post', async () => {
    const response = await request(server).get('/posts/foobar')

    expect(response.status).toEqual(404)
  })
})
