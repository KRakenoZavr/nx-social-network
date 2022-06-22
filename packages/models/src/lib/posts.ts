import * as mongoose from 'mongoose'
import { CreatedPost } from '@next-electron-app/interfaces'

mongoose.Schema.Types.String.set('trim', true)
mongoose.Schema.Types.String.set('min', 3)
mongoose.Schema.Types.String.set('min', 500)

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    unique: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  groupID: {
    type: mongoose.Types.ObjectId,
  },
  updatedAt: Date,
  createdAt: Date,
})

postSchema.pre('save', function (next) {
  const now = new Date()

  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }

  next()
})

export const Post = mongoose.model<CreatedPost>('posts', postSchema)
