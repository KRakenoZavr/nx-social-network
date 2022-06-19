import * as mongoose from 'mongoose'
import { CreatedEvent } from '@next-electron-app/interfaces'

mongoose.Schema.Types.String.set('trim', true)
mongoose.Schema.Types.String.set('min', 3)
mongoose.Schema.Types.String.set('min', 500)

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  groupID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  updatedAt: Date,
  createdAt: Date,
})

eventSchema.pre('save', function (next) {
  const now = Date.now()

  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }

  next()
})

export const Event = mongoose.model<CreatedEvent>('events', eventSchema)
