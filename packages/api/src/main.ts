import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as bodyParser from 'koa-bodyparser'
import * as mongoose from 'mongoose'
import * as UserRoutes from './api/users'

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

router.get('/', (ctx, next) => {
  ctx.body = { data: 'Hello World!' }
})

app
  .use(router.routes())
  .use(UserRoutes.router.routes())
  .use(router.allowedMethods())

mongoose.connect('mongodb://localhost', {
  dbName: 'social-network',
  autoIndex: true,
})

app.listen(3000, () => {
  console.log('Succesfully started at port: http://localhost:3000')
})
