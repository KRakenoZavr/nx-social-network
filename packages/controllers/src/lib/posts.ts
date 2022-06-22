import { mongo } from 'mongoose'
import {
  SavePost,
  GetPost,
  GetPosts,
  UpdatePost,
  DeletePost,
} from '@next-electron-app/interfaces'
import { Post } from '@next-electron-app/models'
import { ServerError } from '@next-electron-app/utils'

export const savePost: SavePost = async (post) => {
  const msg = new Post(post)
  return await msg.save()
}

export const getPosts: GetPosts = async () => {
  return await Post.find()
}

export const updatePost: UpdatePost = async (post, id) => {
  const data = await Post.updateOne(
    { _id: new mongo.ObjectId(id) },
    {
      $set: { ...post },
      $currentDate: { updatedAt: true },
    },
    { runValidators: true }
  )
  if (data.modifiedCount === 0) {
    throw new ServerError({ message: 'Post not found', status: 400 })
  }
  return 'Successfully updated post info'
}

export const getPost: GetPost = async (id) => {
  return await Post.findOne({
    _id: new mongo.ObjectId(id),
  })
}

export const deletePost: DeletePost = async (id) => {
  return await Post.deleteOne({
    _id: new mongo.ObjectId(id),
  })
}
