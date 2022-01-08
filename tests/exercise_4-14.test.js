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

test('likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 999

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map(blog => blog.likes)

    expect(contents).toContain(blogToUpdate.likes)
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})