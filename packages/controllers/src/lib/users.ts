import { mongo } from 'mongoose'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import {
  SaveUser,
  GetUsers,
  GetUser,
  UpdateUser,
  LoginUser,
} from '@next-electron-app/interfaces'
import { User } from '@next-electron-app/models'
import { ServerError } from '@next-electron-app/utils'

export const registerUser: SaveUser = async (user) => {
  const encryptedPassword = await hash(user.password, 10)
  const msg = new User({ ...user, password: encryptedPassword })
  const data = await msg.save()

  const token = sign({ userID: data._id, email: data.email }, 'kekwpek', {
    expiresIn: '2h',
  })

  data.token = token

  return data
}

export const getUsers: GetUsers = async () => {
  return await User.find()
}

export const updateUser: UpdateUser = async (user, id) => {
  const data = await User.updateOne(
    { _id: new mongo.ObjectId(id) },
    {
      $set: { ...user },
      $currentDate: { updatedAt: true },
    },
    { runValidators: true }
  )
  if (data.modifiedCount === 0) {
    throw new ServerError({ message: 'User not found', status: 400 })
  }
  return 'Successfully updated user info'
}

export const getUser: GetUser = async (id) => {
  const data = await User.findOne({
    _id: new mongo.ObjectId(id),
  })
  return data
}

export const loginUser: LoginUser = async (body) => {
  const { email, password } = body

  const user = await User.findOne({ email })

  if (user && (await compare(password, user.password))) {
    const token = sign({ userID: user._id, email }, 'kekwpek', {
      expiresIn: '2h',
    })

    user.token = token

    return user
  }
  throw new ServerError({
    message: 'Please check your credentials',
    status: 400,
  })
}
