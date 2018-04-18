export type Id = string

export interface DbModel {
  _id: Id,
  isNew: boolean,
  errors: object,
  save: (options: object, safe: boolean, validateBeforeSave: boolean, callback?: () => void) => Promise<DbModel>,
  validate: () => boolean,
  remove: (error: Error, model: DbModel) => Promise<any>,
}
