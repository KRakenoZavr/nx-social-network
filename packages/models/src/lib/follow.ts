import { CreatedFollow } from '@next-electron-app/interfaces'
import * as mongoose from 'mongoose'

const followSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  followID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  which: {
    type: String,
    required: true,
  },
  updatedAt: Date,
  createdAt: Date,
})

followSchema.pre('save', function (next) {
  const now = Date.now()

  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }

  next()
})

export const Follow = mongoose.model<CreatedFollow>('follows', followSchema)
