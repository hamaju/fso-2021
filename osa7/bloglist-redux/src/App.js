import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import UserList from './components/UserList'
import Menu from './components/Menu'
import User from './components/User'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    )

    if (loggedInUserJSON) {
      const user = loggedInUserJSON
      blogService.setToken(user?.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user?.token)
  }, [user])

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Menu user={user} />
      <Notification />

      <Switch>
        <Route path="/blogs/:id">
          <BlogInfo user={user} />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          <br />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm user={user} />
          </Togglable>
          <br />
          <BlogList user={user} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
