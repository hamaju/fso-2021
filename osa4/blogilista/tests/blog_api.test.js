const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

beforeEach(async () => {
  // await Blog.deleteMany({});
  // const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  // const promiseArray = blogObjects.map((note) => note.save());
  // await Promise.all(promiseArray);

  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

const api = supertest(app);

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

test('adding a blog increases the number of blogs by one', async () => {
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

test('if blog does not have the field likes, set it to 0', async () => {
  const blogWithNoLikes = {
    title: 'test blog',
    author: 'tester',
    url: 'example.com',
  };

  await api.post('/api/blogs').send(blogWithNoLikes);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
});

test('blog without title and url is not added', async () => {
  const malformattedBlog = {
    author: 'a',
  };

  await api.post('/api/blogs').send(malformattedBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
