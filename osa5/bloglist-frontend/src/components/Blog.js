import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
          likes {blog.likes} <button>like</button>
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
