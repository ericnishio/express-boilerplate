// @flow

import register from '$modules/auth/register'
import login from '$modules/auth/login'
import verify from '$modules/auth/verify'
import refresh from '$modules/auth/refresh'
import createPost from '$modules/post/createPost'
import getPost from '$modules/post/getPost'
import notFound from '$modules/errors/404'

import {auth} from '$modules/auth/middlewares'

export default {
  'post /auth/register': {handler: register},
  'post /auth/login': {handler: login},
  'get /auth/verify': {handler: verify},
  'post /auth/refresh': {handler: refresh},
  'post /posts': {handler: createPost, middlewares: [auth]},
  'get /posts/:id': {handler: getPost},
  'get *': {handler: notFound},
}
