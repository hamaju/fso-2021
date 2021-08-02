const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id/comments', async (req, res) => {
  const { id } = req.params
  const blog = await Blog.findById(id).populate('comments')

  res.json(blog)
})

commentsRouter.post('/:id/comments', async (req, res) => {
  const { body } = req
  const { id } = req.params

  const blog = await Blog.findById(id)

  if (!body.content) {
    res.sendStatus(400)
  }

  const comment = new Comment({
    content: body.content,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  res.json(savedComment.toJSON())
})

module.exports = commentsRouter
