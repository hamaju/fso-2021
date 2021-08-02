import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'

const BlogInfo = () => {
  const user = useSelector((state) => state.login)

  const blogs = useSelector((state) => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const dispatch = useDispatch()
  const history = useHistory()

  if (!blog) {
    return null
  }

  const handleBlogLike = async () => {
    const { id, author, url, title } = blog
    const updatedBlog = {
      user,
      likes: blog.likes + 1,
      title,
      author,
      url,
    }

    dispatch(likeBlog(id, updatedBlog))
    dispatch(setNotification(`Liked '${blog.title}'`))
  }

  const handleBlogRemove = async () => {
    const { id } = blog

    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}?`
      )
    ) {
      dispatch(removeBlog(id))
      dispatch(setNotification(`Removed '${blog.title}'`))

      history.push('/')
    }
  }

  return (
    <div className="content">
      <h1 className="title is-3 has-text-weight-bold mt-5">{blog.title}</h1>
      <h2 className="subtitle is-5 has-text-weight-semibold">
        by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <button className="button is-link" onClick={handleBlogLike}>
        Like
      </button>
      {blog.user.username === user?.username ? (
        <button
          className="button is-danger is-light ml-3"
          onClick={handleBlogRemove}
        >
          Remove
        </button>
      ) : (
        ''
      )}
      <h3 className="title is-4 has-text-weight-bold">Comments</h3>
      <CommentForm />
      {blog.comments.length > 0 ? (
        blog.comments
          .map((comment) => (
            <div className="box" key={comment.id}>
              {comment.content}
            </div>
          ))
          .reverse()
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  )
}

export default BlogInfo
