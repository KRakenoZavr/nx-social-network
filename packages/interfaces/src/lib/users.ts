import { ApiResponse, MongoID } from './interfaces'
import * as mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password: string
  birthDate: Date

  nickname?: string
  avatar?: string
  about?: string
}

export interface CreatedUser extends IUser {
  updatedAt: Date
  createdAt: Date
}

export type SaveUser = (user: IUser) => Promise<ApiResponse>

export type GetUsers = () => Promise<ApiResponse>

export type UpdateUser = (
  user: CreatedUser,
  id: MongoID
) => Promise<ApiResponse>

export type GetUser = (id: MongoID) => Promise<ApiResponse>

export type FuncListStr = 'updateUser' | 'getUser' | 'getUsers' | 'saveUser'

export type FuncListMap = {
  updateUser: UpdateUser
  getUser: GetUser
  getUsers: GetUsers
  saveUser: SaveUser
}

export type UserArgs = CreatedUser & IUser & MongoID
export type UserController = () => Promise<ApiResponse>