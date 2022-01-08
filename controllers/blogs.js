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

    // Add this as validators (see if you can do AND as well)
    if (!info.title && !info.url) {
        return res.status(400).json({ error: '\'title\' and \'url\' fields must be defined' })
    }

    if (info.likes === undefined) {
        info.likes = 0
    }

    const blog = new Blog(info)
    const result = await blog.save()
    res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const info = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(id, { likes: info.likes }, { new: true })
    res.json(updatedBlog)
})
module.exports = blogsRouter
