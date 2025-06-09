const express = require('express')
const auth = require('./auth')
const billingCycleRouter = require('../api/billingCycle/billingCycleService')

module.exports = function (server) {
  // Rotas protegidas
  const protectedApi = express.Router()
  server.use('/api', protectedApi)
  protectedApi.use(auth)
  protectedApi.use('/billingCycles', billingCycleRouter)

  // Rotas abertas
  const openApi = express.Router()
  server.use('/oapi', openApi)

  const AuthService = require('../api/user/authService')
  openApi.use(AuthService)
}
