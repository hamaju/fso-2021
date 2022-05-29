const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body, user } = request

  if (!body.title && !body.url) {
    response.sendStatus(400)
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

  response.json(savedBlog.toJSON())
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const { user } = request
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      return response.status(204).end()
    }

    response.sendStatus(401)
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })

  response.status(200).json(updatedBlog.toJSON())
})

module.exports = blogsRouter
