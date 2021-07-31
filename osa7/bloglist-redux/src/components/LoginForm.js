import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const loginHelper = async (username, password) => {
    try {
      await dispatch(login(username, password))
      dispatch(setNotification(`successfully logged in as ${username}`))
    } catch (err) {
      console.error(err)
      dispatch(setNotification('wrong username or password'))
    }
  }

  const handleLogin = (event) => {
    event.preventDefault()

    try {
      loginHelper(username.value, password.value)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      username
      <br />
      <input {...username} />
      <br />
      password
      <br />
      <input {...password} />
      <br />
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
