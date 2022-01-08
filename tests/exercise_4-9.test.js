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

test('objects have \'id\' property (not \'_id\')', async () => {
    const response = await api.get('/api/blogs/')

    expect(response.body[0].id).toBeDefined()
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})