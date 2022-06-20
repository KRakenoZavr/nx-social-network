import { ApiResponse, MongoID } from '.'
import * as mongoose from 'mongoose'

type PostTypes = 'public' | 'private' | 'almost private'

export interface IPost extends mongoose.Document {
  title: string
  description: string
  type: PostTypes
  groupID: mongoose.Types.ObjectId
  userID: mongoose.Types.ObjectId
}

export interface CreatedPost extends IPost {
  updatedAt: Date
  createdAt: Date
}

export type SavePost = (post: IPost) => Promise<ApiResponse>

export type GetPosts = () => Promise<ApiResponse>

export type UpdatePost = (
  post: CreatedPost,
  id: MongoID
) => Promise<ApiResponse>

export type GetPost = (id: MongoID) => Promise<ApiResponse>
export type DeletePost = (id: MongoID) => Promise<ApiResponse>
