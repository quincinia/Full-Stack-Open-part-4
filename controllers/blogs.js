const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         res.json(blogs)
    //     })

    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const info = req.body

    if (info.likes === undefined) {
        info.likes = 0
    }

    const blog = new Blog(info)
    const result = await blog.save()
    res.status(201).json(result)
})

module.exports = blogsRouter
