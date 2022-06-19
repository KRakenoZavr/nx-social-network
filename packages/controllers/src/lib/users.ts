import { mongo } from 'mongoose'
import {
  SaveUser,
  GetUsers,
  GetUser,
  UpdateUser,
} from '@next-electron-app/interfaces'
import { User } from '@next-electron-app/models'
import { MongoServerError } from 'mongodb'

const errorHandler = (err: any) => {
  if (err instanceof Error) {
    return {
      data: err.message,
      code: 1,
    }
  }
  return {
    data: err,
    code: 1,
  }
}

export const saveUser: SaveUser = async (user) => {
  try {
    const msg = new User(user)
    const data = await msg.save()
    return {
      data,
      code: 0,
    }
  } catch (err) {
    console.log({ err, user })
    if (err instanceof MongoServerError) {
      if (err.code === 11000) {
        return {
          data: `Duplicate key ${JSON.stringify(err['keyValue'])}`,
          code: 1,
        }
      }
    }
    return errorHandler(err)
  }
}

export const getUsers: GetUsers = async () => {
  try {
    const data = await User.find()
    return {
      data,
      code: 0,
    }
  } catch (err) {
    console.log({ err })
    return errorHandler(err)
  }
}

export const updateUser: UpdateUser = async (user, id) => {
  try {
    const data = await User.updateOne(
      { _id: new mongo.ObjectId(id) },
      {
        $set: { ...user },
        $currentDate: { updatedAt: true },
      },
      { runValidators: true }
    )
    if (data.modifiedCount === 0) {
      return { data: 'User not found', code: 1 }
    }
    return {
      data: 'Successfully updated user info',
      code: 0,
    }
  } catch (err) {
    console.log({ err, user, id })
    return { data: err, code: 1 }
  }
}

export const getUser: GetUser = async (id) => {
  try {
    const data = await User.findOne({
      _id: new mongo.ObjectId(id),
    })
    return {
      data,
      code: 0,
    }
  } catch (err) {
    console.log({ err, id })
    return errorHandler(err)
  }
}
