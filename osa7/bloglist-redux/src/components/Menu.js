import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
  }

  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.name} <button onClick={handleLogout}>log out</button>
    </div>
  )
}

export default Menu
