import { mongo } from 'mongoose'
import {
  SaveUser,
  GetUsers,
  GetUser,
  UpdateUser,
  LoginUser,
} from '@next-electron-app/interfaces'
import { User } from '@next-electron-app/models'
import { MongoServerError } from 'mongodb'
import { errorHandler } from './helpers'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

export const registerUser: SaveUser = async (user) => {
  try {
    const encryptedPassword = await hash(user.password, 10)
    const msg = new User({ ...user, password: encryptedPassword })
    const data = await msg.save()

    const token = sign({ userID: data._id, email: data.email }, 'kekwpek', {
      expiresIn: '2h',
    })

    data.token = token

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

export const loginUser: LoginUser = async (body) => {
  try {
    const { email, password } = body

    const user = await User.findOne({ email })

    if (user && (await compare(password, user.password))) {
      const token = sign({ userID: user._id, email }, 'kekwpek', {
        expiresIn: '2h',
      })

      user.token = token

      return {
        data: user,
        code: 0,
      }
    }
    return {
      data: 'Please check your credentials',
      code: 1,
    }
  } catch (err) {
    console.log({ err, body })
    return errorHandler(err)
  }
}
