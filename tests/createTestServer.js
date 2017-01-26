// @flow

import 'babel-polyfill'
import {resolve} from 'path'
import http from 'http'

import createApp from '$app/createApp'

import type {Server} from 'http'

require('dotenv').config({path: resolve(`{__dirname}/../.env.test`)})

export default (): Server =>
  http.createServer(createApp())
