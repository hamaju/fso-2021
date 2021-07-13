import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'primary') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create(blogObject)
    const returnedBlogs = await blogService.getAll()
    setBlogs(returnedBlogs)
    notify(`added ${blogObject.title} by ${blogObject.author}`)
  }

  const updateBlog = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    const returnedBlogs = await blogService.getAll()
    setBlogs(returnedBlogs)
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.filter((blog) => blog.id === id)

    if (
      window.confirm(
        `Are you sure you want to remove ${blogToRemove[0].title} by ${blogToRemove[0].author}?`
      )
    ) {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      notify('wrong username or password', 'error')
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification notification={notification} />
        <LoginForm
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <LogoutForm user={user} handleLogout={handleLogout} />
      <br></br>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <br></br>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  )
}

export default App
