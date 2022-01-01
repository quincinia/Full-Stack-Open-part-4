// External dependencies
const http = require('http')

// Custom modules
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// Begin app
const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})