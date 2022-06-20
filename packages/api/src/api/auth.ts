import * as Router from '@koa/router'
import { loginUser, registerUser } from '@next-electron-app/controllers'

export const router = new Router()

router.post('/register', async (ctx) => {
  const result = await registerUser(ctx.request.body)
  ctx.set('x-access-token', result.data.token)
  ctx.body = result
})

router.post('/login', async (ctx) => {
  const result = await loginUser(ctx.request.body)
  ctx.set('x-access-token', result.data.token)
  ctx.body = result
})
