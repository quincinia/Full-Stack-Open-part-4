const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message }) // Not sure why this uses .json() instead of .send()
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    } else {
        req.token = 'fail'
    }

    next()
}

const userExtractor = async (req, res, next) => {
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) { // Need to make sure the id points to something before we use it
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    // id needs to be valid
    req.user = await User.findById(decodedToken.id)
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}