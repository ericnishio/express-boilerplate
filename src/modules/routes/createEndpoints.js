// @flow

import routes from '$src/routes'

import type {$App} from 'express'
import type {Route, Endpoint} from '$src/types'

export default (app: $App) => {
  const endpoints = Object.keys(routes).map((route: Route): Endpoint => ({
    route,
    handler: routes[route],
  }))

  endpoints.forEach((endpoint) => {
    const [method, path] = endpoint.route.split(' ')

    app[method](path, endpoint.handler)
  })
}
