require('dotenv').config() // connecting to cluster, not using local db
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// Now pulls url from config file instead of defining it here
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const server = http.createServer(app)

// Pulls port from config
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})