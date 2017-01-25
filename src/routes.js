// @flow

import home from '$modules/home'
import notFound from '$modules/errors/404'

export default {
  'get /': home,
  'get *': notFound,
}
