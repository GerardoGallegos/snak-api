import app from './app'
import logger from './logger'

const PORT = process.env.PORT || 8080
const HOST = app.get('host') || 'localhost'

const server = app.listen(PORT)

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info('Server is Running http://%s:%d', HOST, PORT)
)
