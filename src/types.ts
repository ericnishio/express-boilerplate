import {Request, Response, NextFunction} from 'express'

export type Route = string

export type Middleware = (req: Request, res: Response, next: NextFunction) => void

export interface Endpoint {
  route: Route,
  handler: (req: Request, res: Response) => void,
  middlewares: Middleware[],
}

export interface Routes {
  [route: string]: RouteConfig,
}

interface RouteConfig {
  handler: (req: Request, res: Response) => void,
  middlewares?: Middleware[],
}
