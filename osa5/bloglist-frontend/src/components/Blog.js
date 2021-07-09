import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
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
          added by {blog.user.name}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Blog
