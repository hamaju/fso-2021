import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Navbar = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())

    history.push('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="navbar-item has-text-weight-bold" to="/">
          Bloglist app
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item has-text-weight-semibold" to="/">
            Blogs
          </Link>
          <Link className="navbar-item has-text-weight-semibold" to="/users">
            Users
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">{user.name}</div>
          <div className="navbar-item">
            <button className="button is-light" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
