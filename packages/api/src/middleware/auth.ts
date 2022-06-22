import * as jwt from 'jsonwebtoken'
import { errorHandler } from '@next-electron-app/utils'

export const cors = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:4200')
  ctx.set('Access-Control-Allow-Headers', '*')
  await next()
}

// x-response-time
export const responseTimer = async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

export const verifyToken = async (ctx, next) => {
  if (ctx.url !== '/login' && ctx.url !== '/register') {
    const token =
      ctx.request?.body?.token ||
      ctx.request?.query?.token ||
      ctx.request?.headers['x-access-token']

    if (!token) {
      ctx.throw(403, 'A token is required for authentication')
    }
    try {
      const decoded = jwt.verify(token, 'kekwpek')
      ctx.request.user = decoded
    } catch (err) {
      ctx.throw(401, 'Invalid Token')
    }
  }
  await next()
}

export const handler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log({ err, data: ctx.request.body || ctx.params })
    const result = errorHandler(err)

    ctx.body = { message: result.message }
    ctx.status = result.status || 500
  }
}
