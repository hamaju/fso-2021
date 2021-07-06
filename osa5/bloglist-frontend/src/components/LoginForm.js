import React from 'react'
import Input from './Input'

const LoginForm = ({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
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

export default LoginForm
