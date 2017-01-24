// @flow

import type {$Request, $Response} from 'express'

export type Route = string // e.g. 'get /foo/bar'

export type Endpoint = {
  route: Route,
  handler: ($Request, $Response) => mixed,
}
