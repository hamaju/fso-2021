import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const CommentForm = () => {
  const { reset, ...comment } = useField('text')

  const blogs = useSelector((state) => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!comment.value || comment.value === '') {
      dispatch(setNotification('Comment cannot be empty'))
      return null
    }

    const newComment = {
      content: comment.value,
    }

    dispatch(commentBlog(blog.id, newComment))
    reset()
  }

  return (
    <form className="form mb-5" onSubmit={handleSubmit}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input className="input" {...comment} />
        </div>
        <div className="control">
          <button className="button" id="login-button" type="submit">
            Comment
          </button>
        </div>
      </div>
    </form>
  )
}

export default CommentForm
