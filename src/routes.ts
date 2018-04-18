import {Request, Response, NextFunction} from 'express'

import {Middleware} from './app/types'
import register from './modules/auth/handlers/register'
import login from './modules/auth/handlers/login'
import verify from './modules/auth/handlers/verify'
import refresh from './modules/auth/handlers/refresh'
import createPost from './modules/post/handlers/createPost'
import getPost from './modules/post/handlers/getPost'
import notFound from './modules/error/handlers/404'
import {auth} from './modules/auth/middlewares'

interface RouteConfig {
  handler: (req: Request, res: Response) => void,
  middlewares?: Middleware[],
}

interface RouteMap {
  [route: string]: RouteConfig,
}

const routes: RouteMap = {
  'post /auth/register': {handler: register},
  'post /auth/login': {handler: login},
  'get /auth/verify': {handler: verify},
  'post /auth/refresh': {handler: refresh},
  'post /posts': {handler: createPost, middlewares: [auth]},
  'get /posts/:id': {handler: getPost},
  'get *': {handler: notFound},
}

export default routes
