const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// const routes = require('./routes')
// const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/index', ctx.query)
    ctx.respond = false
  })

  router.get('/post/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/post', ctx.query)
    ctx.respond = false
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    // handler(ctx.req, ctx.res)
    await next()
  })

  server.use(router.routes())
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
