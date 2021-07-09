import React from 'react'

const LogoutForm = ({ handleLogout, user }) => {
  return (
    <form onSubmit={handleLogout}>
      logged in as {user.name} <button type="submit">log out</button>
    </form>
  )
}

export default LogoutForm
