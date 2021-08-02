import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, Link } from 'react-router-dom'

const User = () => {
  const users = useSelector((state) => state.users)
  const match = useRouteMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) {
    return null
  }

  return (
    <div>
      <h1 className="title is-3 has-text-weight-bold mt-5">{user.name}</h1>
      <h2 className="title is-5 has-text-weight-semibold">Added blogs</h2>
      {user.blogs.length > 0 ? (
        <ul>
          {user.blogs.map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <li>{blog.title}</li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>User has not added any blogs</p>
      )}
    </div>
  )
}

export default User
