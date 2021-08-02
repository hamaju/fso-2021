import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import blogService from './services/blogs'
import Navbar from './components/Navbar'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogInfo from './components/BlogInfo'
import User from './components/User'
import UserList from './components/UserList'

const App = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    )

    if (loggedUserJSON) {
      const user = loggedUserJSON
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
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <BlogInfo />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/">
            <h1 className="title is-3 has-text-weight-bold mt-5">Blogs</h1>
            <BlogForm />
            <div className="columns">
              <div className="column"></div>
              <BlogList />
              <div className="column"></div>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
