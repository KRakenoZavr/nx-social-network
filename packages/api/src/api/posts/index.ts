import * as Router from '@koa/router'
export const router = new Router({ prefix: '/posts' })

router.get('/', async (ctx, next) => {
  ctx.body = 'here is listed all users'
})
