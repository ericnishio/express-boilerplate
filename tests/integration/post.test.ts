import createTestServer from '../createTestServer'

describe('post', () => {
  let server
  let requestAsUser

  beforeAll(async () => {
    server = await createTestServer()
    requestAsUser = await server.requestAs()
  })

  afterAll(async () => {
    await server.destroy()
  })

  test('create post', async () => {
    const post = {
      title: 'Hello World',
      body: 'Welcome to my blog.',
    }

    const response = await requestAsUser
      .post('/posts')
      .send(post)

    expect(response.status).toEqual(201)
  })

  test('throw 400 when submitting empty post', async () => {
    const post = {}
    const response = await requestAsUser
      .post('/posts')
      .send(post)

    expect(response.status).toEqual(400)
  })

  test('throw 401 when submitting unauthorized post', async () => {
    const post = {
      title: 'Hello World',
      body: 'Welcome to my blog.',
    }

    const response = await server.request()
      .post('/posts')
      .send(post)

    expect(response.status).toEqual(401)
  })

  test('fetch post', async () => {
    const post = {
      title: 'Hello World',
      body: 'Welcome to my blog.',
    }

    const createResponse = await requestAsUser
      .post('/posts')
      .send(post)

    const getResponse = await server.request()
      .get(`/posts/${createResponse.body._id}`)

    expect(getResponse.status).toEqual(200)
    expect(getResponse.body.title).toEqual('Hello World')
  })

  test('throw 404 when fetching nonexistent post', async () => {
    const response = await server.request()
      .get('/posts/59e793a1d1107e9ee08e031e')

    expect(response.status).toEqual(404)
  })

  test('throw 404 when fetching post with invalid ObjectID', async () => {
    const response = await server.request()
      .get('/posts/foobar')

    expect(response.status).toEqual(404)
  })
})
