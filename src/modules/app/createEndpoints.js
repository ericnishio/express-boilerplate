// @flow

import routes from '$src/routes'

import type {App, Route, Endpoint} from './types'

export default (app: App) => {
  const endpoints = Object.keys(routes).map((route: Route): Endpoint => ({
    route,
    handler: routes[route],
  }))

  endpoints.forEach((endpoint: Endpoint) => {
    const [method, path] = endpoint.route.split(' ')

    app[method](path, endpoint.handler)
  })
}
