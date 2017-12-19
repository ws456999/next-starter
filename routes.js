const routes = (module.exports = require('next-routes')())

routes
  .add('/', '/', 'index')
  .add('about')
  .add('post', '/post/:id')
  // .add({ name: 'beta', pattern: '/v3', page: 'v3' })
