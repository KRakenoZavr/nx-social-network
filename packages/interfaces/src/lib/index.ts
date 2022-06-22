export type ApiResponse = any
export type MongoID = string
export type DefaultString = string | null
export type ServerErrorProps = {
  message: string
  status?: number
}

export type ServerErrorResponse = {
  message: string | Error
  status?: number
}

export * from './users'
export * from './posts'
export * from './groups'
export * from './follow'
export * from './events'
