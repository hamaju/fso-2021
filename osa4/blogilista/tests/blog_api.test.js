const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider...',
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

const api = supertest(app);

test('correct number of blogs are returned as json', async () => {
  const res = await api.get('/api/blogs');

  expect(res.body).toHaveLength(initialBlogs.length);

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

afterAll(() => {
  mongoose.connection.close();
});
