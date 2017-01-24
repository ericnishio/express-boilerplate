// @flow

import notFound from '$modules/errors/404'
import home from '$modules/home'

export default {
  'get /': home,
  'get *': notFound,
}
