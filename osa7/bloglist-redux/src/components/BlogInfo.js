import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { like } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogInfo = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  // const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  if (!blog) {
    return null
  }

  const likeBlog = async () => {
    const { id, author, url, title } = blog
    const updatedBlog = {
      user,
      likes: blog.likes + 1,
      title,
      author,
      url,
    }

    dispatch(like(id, updatedBlog))
    dispatch(setNotification(`liked '${blog.title}'`))
  }

  const removeBlog = async () => {
    const { id } = blog

    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}?`
      )
    ) {
      dispatch(deleteBlog(id))
      dispatch(setNotification(`removed '${blog.title}'`))

      history.push('/')
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={likeBlog}>like</button>
      </p>
      <p>added by {blog.user.name}</p>

      {blog.user.username === user?.username ? (
        <button onClick={removeBlog}>remove</button>
      ) : (
        ''
      )}
    </div>
  )
}

export default BlogInfo
