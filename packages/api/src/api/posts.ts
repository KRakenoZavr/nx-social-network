import * as Router from '@koa/router'
import {
  savePost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} from '@next-electron-app/controllers'

export const router = new Router({ prefix: '/posts' })

router.post('/', async (ctx) => {
  ctx.body = await savePost(ctx.request.body)
})

router.get('/', async (ctx) => {
  ctx.body = await getPosts()
})

router.post('/:id', async (ctx) => {
  ctx.body = await updatePost(ctx.request.body, ctx.params.id)
})

router.get('/:id', async (ctx) => {
  ctx.body = await getPost(ctx.params.id)
})

router.delete('/:id', async (ctx) => {
  ctx.body = await deletePost(ctx.params.id)
})
