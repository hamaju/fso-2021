import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const LogoutForm = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
  }

  return (
    <form onSubmit={handleLogout}>
      logged in as {user.name} <button type="submit">log out</button>
    </form>
  )
}

export default LogoutForm
