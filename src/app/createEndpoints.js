// @flow

import routes from '$src/routes'

import type {$Application} from 'express'
import type {Route, Endpoint} from './types'

export default (app: $Application) => {
  const endpoints = Object.keys(routes).map((route: Route): Endpoint => ({
    route,
    handler: routes[route],
  }))

  endpoints.forEach((endpoint: Endpoint) => {
    const [method, path] = endpoint.route.split(' ')

    // $FlowIgnore
    app[method](path, endpoint.handler)
  })
}
