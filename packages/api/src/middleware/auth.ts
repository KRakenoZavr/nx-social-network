import * as jwt from 'jsonwebtoken'

export const verifyToken = async (ctx, next) => {
  if (ctx.url !== '/login' && ctx.url !== '/register') {
    const token =
      ctx.request.body.token ||
      ctx.request.query.token ||
      ctx.request.headers['x-access-token']

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
