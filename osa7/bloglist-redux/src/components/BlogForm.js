import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Input from './Input'

const BlogForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }

    dispatch(createBlog(newBlog, user))
    dispatch(setNotification(`added '${title}'`))

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
    <form onSubmit={handleSubmit}>
      <Input
        label="title"
        type="text"
        value={title}
        name="Title"
        onChange={handleTitleChange}
      />
      <Input
        label="author"
        type="text"
        value={author}
        name="Author"
        onChange={handleAuthorChange}
      />
      <Input
        label="url"
        type="url"
        value={url}
        name="URL"
        onChange={handleUrlChange}
      />
      <button type="submit">add</button>
    </form>
  )
}

export default BlogForm
