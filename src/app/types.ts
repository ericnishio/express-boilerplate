import {Request, Response, NextFunction} from 'express'

export type Id = string

export type Route = string

export type Middleware = (req: Request, res: Response, next: NextFunction) => void

export interface Endpoint {
  route: Route,
  handler: (req: Request, res: Response) => void,
  middlewares: Middleware[],
}

export interface DbModel {
  _id: Id,
  isNew: boolean,
  errors: object,
  save: (options: object, safe: boolean, validateBeforeSave: boolean, callback?: () => void) => Promise<DbModel>,
  validate: () => boolean,
  remove: (error: Error, model: DbModel) => Promise<any>,
}
