// @flow

import routes from '$src/routes'

import type {$Application} from 'express'
import type {Route, Endpoint} from './types'

export default (app: $Application) => {
  const endpoints = Object.keys(routes).map((route: Route): Endpoint => ({
    route,
    handler: routes[route].handler,
    middlewares: routes[route].middlewares || [],
  }))

  endpoints.forEach(({route, middlewares, handler}: Endpoint) => {
    const [method, path] = route.split(' ')
    const params = [path, ...middlewares, handler]

    // $FlowIgnore
    app[method].apply(app, params)
  })
}
