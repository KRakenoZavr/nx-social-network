import User, { IUser } from '../models/user'

export const updateOne = async (user: IUser) => {
  console.log({ ...user })
  const { firstName, lastName, email, password, birthDate } = user
  return await User.updateOne(
    { email },
    { firstName, lastName, email, password, birthDate },
    { upsert: true, runValidators: true }
  )
}

export const save = async (user: IUser) => {
  const msg = new User(user)
  const res = await msg.save()
  return res
}

export const getUsers = async () => {
  return await User.find()
}
