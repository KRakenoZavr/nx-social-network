import * as mongoose from 'mongoose'
import { CreatedUser } from '@next-electron-app/interfaces'

mongoose.Schema.Types.String.set('trim', true)

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
    min: new Date('1922'),
    max: new Date(),
  },

  token: {
    type: String,
    default: null,
  },

  nickname: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
  about: {
    type: String,
    default: null,
  },

  updatedAt: Date,
  createdAt: Date,
})

userSchema.pre('save', function (next) {
  const now = new Date()

  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }

  next()
})

export const User = mongoose.model<CreatedUser>('users', userSchema)
