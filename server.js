const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const { v4: uuidv4 } = require('uuid');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}))

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.discussionID = uuidv4();
    req.body.hasStarted = false;
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})
