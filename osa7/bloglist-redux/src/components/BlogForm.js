import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Input from './Input'
import Togglable from './Togglable'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    const newBlog = { title, author, url }

    dispatch(createBlog(newBlog))
    dispatch(setNotification(`Added '${title}'`))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <div className="column is-half">
        <form className="box" onSubmit={handleSubmit}>
          <Input
            label="Title"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
          <Input
            label="Author"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
          <Input
            label="URL"
            type="url"
            value={url}
            name="URL"
            onChange={handleUrlChange}
          />
          <button className="button is-link" type="submit">
            Add
          </button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm
