// @flow

import createPost from '$modules/post/createPost'
import getPost from '$modules/post/getPost'
import notFound from '$modules/errors/404'

import {auth} from '$modules/post/middlewares'

export default {
  'post /posts': {handler: createPost, middlewares: [auth]},
  'get /posts/:id': {handler: getPost},
  'get *': {handler: notFound},
}
