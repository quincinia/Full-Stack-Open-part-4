const blogsRouter = require('express').Router()
// const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         res.json(blogs)
    //     })

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const info = req.body

    // Added as validators under blog model
    // if (!info.title && !info.url) {
    //     return res.status(400).json({ error: '\'title\' and \'url\' fields must be defined' })
    // }

    // if (info.likes === undefined) {
    //     info.likes = 0
    // }

    const user = req.user

    // Don't use spread syntax because more data might be sent over than expected?
    const blog = new Blog({
        title: info.title,
        author: info.author,
        url: info.url,
        likes: info.likes,
        user: user._id
    })
    const result = await blog.save()

    // Use concat instead of push in case other code needs a reference to the old array?
    // user.blogs = user.blogs.concat(result._id)
    await User.findByIdAndUpdate(user._id, { blogs: user.blogs.concat(result._id) })
    res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
    const user = req.user
    const blog = await Blog.findById(req.params.id)
    if (user._id.toString() === blog.user.toString()) {
        await Blog.findByIdAndDelete(req.params.id)
        return res.status(204).end()
    } else {
        return res.status(401).json({ error: 'you cannot delete this resource' })
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const info = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(id, { likes: info.likes }, { new: true, runValidators: true })
    res.json(updatedBlog)
})

module.exports = blogsRouter