import React from 'react'
import Input from './Input'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <Input
        label="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
      <Input
        label="password"
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
