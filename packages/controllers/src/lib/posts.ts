import { mongo } from 'mongoose'
import {
  SavePost,
  GetPost,
  GetPosts,
  UpdatePost,
  DeletePost,
} from '@next-electron-app/interfaces'
import { Post } from '@next-electron-app/models'
import { MongoServerError } from 'mongodb'
import { errorHandler } from './helpers'

export const savePost: SavePost = async (post) => {
  try {
    const msg = new Post(post)
    const data = await msg.save()
    return {
      data,
      code: 0,
    }
  } catch (err) {
    console.log({ err, post })
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

export const getPosts: GetPosts = async () => {
  try {
    const data = await Post.find()
    return {
      data,
      code: 0,
    }
  } catch (err) {
    console.log({ err })
    return errorHandler(err)
  }
}

export const updatePost: UpdatePost = async (post, id) => {
  try {
    const data = await Post.updateOne(
      { _id: new mongo.ObjectId(id) },
      {
        $set: { ...post },
        $currentDate: { updatedAt: true },
      },
      { runValidators: true }
    )
    if (data.modifiedCount === 0) {
      return { data: 'Post not found', code: 1 }
    }
    return {
      data: 'Successfully updated post info',
      code: 0,
    }
  } catch (err) {
    console.log({ err, post, id })
    return { data: err, code: 1 }
  }
}

export const getPost: GetPost = async (id) => {
  try {
    const data = await Post.findOne({
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

export const deletePost: DeletePost = async (id) => {
  try {
    const data = await Post.deleteOne({
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
