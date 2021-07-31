import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    paddingBottom: 2,
    marginBottom: 2,
    maxWidth: '75%',
  }

  return (
    <div id="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

export default Blog
