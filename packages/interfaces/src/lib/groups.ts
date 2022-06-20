import { ApiResponse, MongoID } from '.'
import * as mongoose from 'mongoose'

export interface IGroup extends mongoose.Document {
  title: string
  description: string
  userID: mongoose.Types.ObjectId
}

export interface CreatedGroup extends IGroup {
  updatedAt: Date
  createdAt: Date
}

export type SaveGroup = (group: IGroup) => Promise<ApiResponse>

export type GetGroups = () => Promise<ApiResponse>

export type UpdateGroup = (
  group: CreatedGroup,
  id: MongoID
) => Promise<ApiResponse>

export type GetGroup = (id: MongoID) => Promise<ApiResponse>
export type DeleteGroup = (id: MongoID) => Promise<ApiResponse>
