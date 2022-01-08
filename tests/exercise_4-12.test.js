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

test('rejects adding items with no title and url', async () => {
    const newBlog = {
        // title: 'Blog for tests',
        author: 'Jacob Gayban',
        // url: 'http://localhost',
        likes: 999
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})