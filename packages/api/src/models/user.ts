import * as mongoose from 'mongoose'

mongoose.Schema.Types.String.set('trim', true)

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
  },
  nickname: {
    type: String,
    unique: true,
  },
  avatar: String,
  about: String,
  updatedAt: Date,
  createdAt: Date,
})

userSchema.pre('save', function (next) {
  console.log('here')
  const now = Date.now()

  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }

  next()
})

export default mongoose.model<IUser>('users', userSchema)
