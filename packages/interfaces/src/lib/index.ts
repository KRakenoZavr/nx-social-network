enum ApiCode {
  'OK' = 0,
  'Err' = 1,
}

export interface ApiResponse {
  data: any
  code: ApiCode
}

export type MongoID = string

export * from './users'
export * from './posts'
export * from './groups'
export * from './follow'
export * from './events'
