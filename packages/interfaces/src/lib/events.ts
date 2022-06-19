import { ApiResponse, MongoID } from './interfaces'
import * as mongoose from 'mongoose'

export interface IEvent extends mongoose.Document {
  title: string
  description: string
  option: string
  time: Date
  groupID: mongoose.Types.ObjectId
  userID: mongoose.Types.ObjectId
}

export interface CreatedEvent extends IEvent {
  updatedAt: Date
  createdAt: Date
}

export type SaveEvent = (event: IEvent) => Promise<ApiResponse>

export type GetEvents = () => Promise<ApiResponse>

export type UpdateEvent = (
  event: CreatedEvent,
  id: MongoID
) => Promise<ApiResponse>

export type GetEvent = (id: MongoID) => Promise<ApiResponse>
export type DeleteEvent = (id: MongoID) => Promise<ApiResponse>
