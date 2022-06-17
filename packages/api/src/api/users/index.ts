import * as Router from '@koa/router'
import * as UserController from '../../controllers/user'
export const router = new Router({ prefix: '/users' })

router.post('/', async (ctx, next) => {
  const result = await UserController.updateOne(ctx.request.body)
  console.log(result)
  ctx.body = { result }
})

router.get('/', async (ctx, next) => {
  const result = await UserController.getUsers()
  console.log(result)
  ctx.body = { result }
})
