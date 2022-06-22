import { CreatedGroup } from '@next-electron-app/interfaces'
import * as mongoose from 'mongoose'

mongoose.Schema.Types.String.set('trim', true)
mongoose.Schema.Types.String.set('min', 3)
mongoose.Schema.Types.String.set('min', 500)

const groupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  updatedAt: Date,
  createdAt: Date,
})

groupSchema.pre('save', function (next) {
  const now = new Date()

  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }

  next()
})

export const Group = mongoose.model<CreatedGroup>('groups', groupSchema)
