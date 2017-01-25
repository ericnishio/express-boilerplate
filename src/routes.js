// @flow

import getGreeting from '$modules/general/getGreeting'
import postMessage from '$modules/general/postMessage'
import notFound from '$modules/errors/404'

export default {
  'get /': getGreeting,
  'post /contact': postMessage,
  'get *': notFound,
}
