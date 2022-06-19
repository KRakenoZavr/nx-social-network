import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as bodyParser from 'koa-bodyparser'
import * as mongoose from 'mongoose'
import * as UserRoutes from './api/users'
import * as PostRoutes from './api/posts'

const app = new Koa()
const router = new Router()

app.use(
  bodyParser({
    onerror: function (err, ctx) {
      ctx.throw('body parse error', 422)
    },
  })
)

// logger
app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url}`)
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app
  .use(UserRoutes.router.routes())
  .use(PostRoutes.router.routes())
  .use(router.allowedMethods())

mongoose.connect('mongodb://localhost', {
  dbName: 'social-network',
  autoIndex: true,
})

app.listen(3000, () => {
  console.log('Succesfully started at port: http://localhost:3000')
})
