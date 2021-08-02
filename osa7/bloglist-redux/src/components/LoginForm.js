import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const LoginForm = () => {
  const { reset: resetUsernameField, ...username } = useField('text')
  const { reset: resetPasswordField, ...password } = useField('password')

  const dispatch = useDispatch()

  const loginHelper = async (username, password) => {
    try {
      await dispatch(login(username, password))
      dispatch(setNotification(`Logged in as ${username}`))
    } catch (err) {
      console.error(err)
      dispatch(setNotification('Wrong username or password'))
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

  // const resetFields = () => {
  //   resetUsernameField()
  //   resetPasswordField()
  // }

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-one-third">
        <div className="content">
          <h1 className="title has-text-weight-bold">Bloglist app</h1>
          <p className="has-text-weight-semibold">Log in to continue</p>
        </div>
        <form className="box" onSubmit={handleLogin}>
          <label className="label">Username</label>
          <input className="input" {...username} />
          <label className="label">Password</label>
          <input className="input" {...password} />
          <button
            className="button is-link mt-3"
            id="login-button"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
