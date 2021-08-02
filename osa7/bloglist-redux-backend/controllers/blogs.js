const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  res.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const { body, user } = req

  if (!body.title && !body.url) {
    res.sendStatus(400)
  }

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const { user } = req
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  }

  res.sendStatus(401)
})

blogsRouter.put('/:id', async (req, res) => {
  const { body } = req

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })

  res.status(200).json(updatedBlog.toJSON())
})

module.exports = blogsRouter
