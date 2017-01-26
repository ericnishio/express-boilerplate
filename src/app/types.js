// @flow

import type {$Request, $Response} from 'express'

export type Route = string

export type Endpoint = {
  route: Route,
  handler: ($Request, $Response) => mixed,
}

export type Id = string
