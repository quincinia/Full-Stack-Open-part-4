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

test('status code 401 if POSTing without token', async () => {
    const newBlog = {
        title: 'Blog for tests',
        author: 'Jacob Gayban',
        url: 'http://localhost',
        likes: 999
    }

    await api
        .post('/api/blogs')
        // .set('Authorization', 'bearer ' + process.env.TEST_TOKEN)
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogsAtEnd.map(blog => blog.title)

    expect(contents).toContain('React patterns')
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})