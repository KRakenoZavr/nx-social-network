import * as Router from '@koa/router'
import {
  saveUser,
  getUsers,
  updateUser,
  getUser,
} from '@next-electron-app/controllers'

export const router = new Router({ prefix: '/users' })

router.post('/', async (ctx) => {
  ctx.body = await saveUser(ctx.request.body)
})

router.get('/', async (ctx) => {
  ctx.body = await getUsers()
})

router.post('/:id', async (ctx) => {
  ctx.body = await updateUser(ctx.request.body, ctx.params.id)
})

router.get('/:id', async (ctx) => {
  ctx.body = await getUser(ctx.params.id)
})
