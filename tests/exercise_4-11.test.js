const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogs = helper.initialBlogs.map((blog) => new Blog(blog))
    const blogsBeingSaved = blogs.map((blog) => blog.save())
    await Promise.all(blogsBeingSaved)
})

test('likes = 0 when undefined', async () => {
    const newBlog = {
        title: 'Blog for tests',
        author: 'Jacob Gayban',
        url: 'http://localhost',
        // likes: 999
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + process.env.TEST_TOKEN)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map((blog) => {
        return {
            title: blog.title,
            likes: blog.likes,
        }
    })
    expect(contents).toContainEqual({ title: 'Blog for tests', likes: 0 })
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})
