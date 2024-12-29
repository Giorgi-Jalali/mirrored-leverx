const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router('../src/db.json')
// const router = jsonServer.router(path.join(__dirname, '../src/db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
  next()
})

server.use(router)

module.exports = (req, res) => server(req, res)
