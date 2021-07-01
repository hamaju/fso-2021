const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is some initial blogs saved', () => {
  test('correct number of blogs are returned as json', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body).toHaveLength(helper.initialBlogs.length);

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs are returned with the field id', async () => {
    const res = await api.get('/api/blogs');
    const ids = res.body.map((r) => r.id);

    expect(ids).toBeDefined();
  });

  test('deletion of a blog succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });

  test('likes of a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 999 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd[0].likes).toBe(999);
  });
});

describe('adding a new blog', () => {
  test('increases the number of blogs by one', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'tester',
      url: 'example.com',
      likes: 3,
    };

    await api.post('/api/blogs').send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('without likes sets its likes to 0', async () => {
    const blogWithNoLikes = {
      title: 'test blog',
      author: 'tester',
      url: 'example.com',
    };

    await api.post('/api/blogs').send(blogWithNoLikes);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
  });

  test('fails with status code 400 if data is invalid', async () => {
    const malformattedBlog = {
      author: 'a',
    };

    await api.post('/api/blogs').send(malformattedBlog).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
