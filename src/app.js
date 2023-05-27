const { Server } = require('./core');
const {UserRoutes} = require('./services/moduleUser/routes')
const {clientRoutes} = require('./services/moduleClient/route')
const {InterlocuteurRoutes}= require('./services/moduleInterlocuteur/routes')
const {InterventionsRoutes}=require('./services/moduleInterventions/routes')
require('./utils/config')

const server = new Server
server.handle400()
      .setRoutes(UserRoutes)
      .setRoutes(clientRoutes)
      .setRoutes(InterlocuteurRoutes)
      .setRoutes(InterventionsRoutes)
      .handle404()
      .startServer()