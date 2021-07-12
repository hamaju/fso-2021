import React, { useState } from 'react'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    maxWidth: '50%',
  }

  const likeBlog = (event) => {
    event.preventDefault()
    const { id, title, author, url, user } = blog
    const updatedBlog = { title, author, url, likes: blog.likes + 1, user }
    updateBlog(id, updatedBlog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    const { id } = blog
    removeBlog(id)
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}{' '}
      <button
        onClick={() => {
          setDetailsVisible(!detailsVisible)
        }}
      >
        {detailsVisible ? 'hide' : 'view'}
      </button>
      {detailsVisible ? (
        <div>
          {blog.url}
          <br></br>
          likes {blog.likes} <button onClick={likeBlog}>like</button>
          <br></br>
          added by {blog.user?.name}
        </div>
      ) : (
        ''
      )}
      {blog.user?.username === user.username ? (
        <button onClick={deleteBlog}>remove</button>
      ) : (
        ''
      )}
    </div>
  )
}

export default Blog
