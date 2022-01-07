const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogs = helper.initialBlogs.map(blog => new Blog(blog))
    const blogsBeingSaved = blogs.map(blog => blog.save())
    await Promise.all(blogsBeingSaved)
})

test('response returns correct # of blogs', async () => {
    const response = await api.get('/api/blogs/')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})