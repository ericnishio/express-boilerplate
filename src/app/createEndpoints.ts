import routes from '../routes'

import {Application} from 'express'
import {Route, IEndpoint} from './types'

export default (app: Application) => {
  const endpoints = Object.keys(routes).map((route: Route): IEndpoint => ({
    route,
    handler: routes[route].handler,
    middlewares: routes[route].middlewares || [],
  }))

  endpoints.forEach(({route, middlewares, handler}: IEndpoint) => {
    const [method, path] = route.split(' ')
    const params = [path, ...middlewares, handler]

    app[method].apply(app, params)
  })
}
