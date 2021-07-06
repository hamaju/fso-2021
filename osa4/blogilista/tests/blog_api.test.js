const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})

  const testUser = {
    username: 'tester',
    name: 'testestest',
    password: 'password',
  }

  await api.post('/api/users').send(testUser)
})

describe('when there is some initial blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('the correct number of blogs is returned as json', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initialBlogs.length)

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are returned with the field id', async () => {
    const res = await api.get('/api/blogs')
    const ids = res.body.map((r) => r.id)
    expect(ids).toBeDefined()
  })

  test('deletion of a blog succeeds if the requesting user is the same as the creator', async () => {
    const user = {
      username: 'tester',
      password: 'password',
    }

    const login = await api.post('/api/login').send(user)
    const { token } = login.body

    const newBlog = {
      title: 'blog to delete',
      author: 'tester',
      url: 'example.com',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('likes of a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 999 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(999)
  })

  describe('adding a new blog', () => {
    test('succeeds if the blog is valid', async () => {
      const newBlog = {
        title: 'test blog',
        author: 'tester',
        url: 'example.com',
        likes: 3,
      }

      const user = {
        username: 'tester',
        password: 'password',
      }

      const login = await api.post('/api/login').send(user)
      const { token } = login.body

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((r) => r.title)
      expect(titles).toContain(newBlog.title)
    })

    test('without likes sets its likes to 0', async () => {
      const blogWithNoLikes = {
        title: 'no likes',
        author: 'tester',
        url: 'example.com',
      }

      const user = {
        username: 'tester',
        password: 'password',
      }

      const login = await api.post('/api/login').send(user)
      const { token } = login.body

      await api
        .post('/api/blogs')
        .send(blogWithNoLikes)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
    })

    test('fails with status code 400 if data is invalid', async () => {
      const malformattedBlog = {
        author: 'tester',
      }

      const user = {
        username: 'tester',
        password: 'password',
      }

      const login = await api.post('/api/login').send(user)
      const { token } = login.body

      await api
        .post('/api/blogs')
        .send(malformattedBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
    })

    test('fails and returns status code 401 if request does not have a token', async () => {
      const newBlog = {
        title: 'no token',
        author: 'tester',
        url: 'example.com',
        likes: 6,
      }

      const token = null

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

      const titles = blogsAtEnd.map((r) => r.title)
      expect(titles).not.toContain(newBlog.title)
    })
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'superuser',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
