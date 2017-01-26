// @flow

import createPost from '$modules/post/createPost'
import getPost from '$modules/post/getPost'
import notFound from '$modules/errors/404'

export default {
  'post /posts': createPost,
  'get /posts/:id': getPost,
  'get *': notFound,
}
