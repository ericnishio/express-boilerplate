// @flow

import 'babel-polyfill'
import http from 'http'

import createApp from '$dist/modules/app/createApp'

import type {Server} from 'http'

export default (): Server =>
  http.createServer(createApp())
