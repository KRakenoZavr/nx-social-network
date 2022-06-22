import * as Koa from 'koa'
import * as Router from '@koa/router'
import * as bodyParser from 'koa-bodyparser'
import * as mongoose from 'mongoose'
import * as UserRoutes from './api/users'
import * as PostRoutes from './api/posts'
import * as AuthRoutes from './api/auth'
import { cors, handler, responseTimer, verifyToken } from './middleware/auth'

const app = new Koa()
const router = new Router()

app.use(cors)

app.use(
  bodyParser({
    onerror: function (err, ctx) {
      console.log('body parse error', err)
      ctx.throw('body parse error', 422)
    },
  })
)

app.use(responseTimer)
app.use(verifyToken)
app.use(handler)

app
  .use(AuthRoutes.router.routes())
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
