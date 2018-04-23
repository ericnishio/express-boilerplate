import {Id} from './types'

export const isObjectId = (id: Id): boolean =>
  /^[0-9a-fA-F]{24}$/.test(id)
