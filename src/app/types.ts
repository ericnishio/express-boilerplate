import {Request, Response, NextFunction} from 'express'

export type Route = string

type Middleware = (req: Request, res: Response, next: NextFunction) => any

export interface IEndpoint {
  route: Route,
  handler: (req: Request, res: Response) => any,
  middlewares: Middleware[],
}

export type Id = string

export interface IDbModel {
  _id: Id,
  isNew: boolean,
  errors: object,
  save: (options: object, safe: boolean, validateBeforeSave: boolean, callback?: () => void) => Promise<IDbModel>,
  validate: () => boolean,
  remove: (error: Error, model: IDbModel) => Promise<any>,
}
