import { ApiResponse, MongoID } from './interfaces'
import * as mongoose from 'mongoose'

type FollowType = 'follow' | 'accepted' | 'invite'
type FollowWhich = 'u-u' | 'g-u' | 'u-g'

export interface IFollow extends mongoose.Document {
  userID: mongoose.Types.ObjectId
  followID: mongoose.Types.ObjectId
  type: FollowType
  which: FollowWhich
}

export interface CreatedFollow extends IFollow {
  updatedAt: Date
  createdAt: Date
}

export type SaveFollow = (follow: IFollow) => Promise<ApiResponse>

export type GetFollows = () => Promise<ApiResponse>

export type UpdateFollow = (
  folow: CreatedFollow,
  id: MongoID
) => Promise<ApiResponse>

export type GetFollow = (id: MongoID) => Promise<ApiResponse>
export type DeleteFollow = (id: MongoID) => Promise<ApiResponse>
