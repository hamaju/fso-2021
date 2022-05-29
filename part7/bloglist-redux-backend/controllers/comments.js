const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findById(id).populate('comments')

  response.json(blog)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const { body } = request
  const { id } = request.params

  const blog = await Blog.findById(id)

  if (!body.content) {
    response.sendStatus(400)
  }

  const comment = new Comment({
    content: body.content,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.json(savedComment.toJSON())
})

module.exports = commentsRouter
