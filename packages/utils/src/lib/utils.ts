import {
  ServerErrorProps,
  ServerErrorResponse,
} from '@next-electron-app/interfaces'
import { MongoServerError } from 'mongodb'
import mongoose from 'mongoose'

export class ServerError extends Error {
  public status?: number

  constructor({ message, status }: ServerErrorProps) {
    super(message)
    this.status = status
  }
}

export const errorHandler = (err: any): ServerErrorResponse => {
  if (err instanceof ServerError) {
    return err
  }
  if (err instanceof MongoServerError) {
    if (err.code === 11000) {
      return {
        message: `Duplicate key ${JSON.stringify(err['keyValue'])}`,
        status: 400,
      }
    }
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return { message: err.message, status: 400 }
  }

  if (err instanceof Error) {
    return {
      message: err.message,
    }
  }
  return {
    message: err.message,
  }
}
