import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import blogService from './services/blogs'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
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
      {/* <div className="container"> */}
      <Notification />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blogs/:id" element={<BlogInfo />}></Route>
        <Route path="/users/:id" element={<User />}></Route>
        <Route path="/users" element={<UserList />}></Route>
      </Routes>
      {/* </div> */}
    </div>
  )
}

export default App
