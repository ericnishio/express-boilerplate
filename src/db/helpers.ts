export const isObjectId = (id: string): boolean =>
  /^[0-9a-fA-F]{24}$/.test(id)
