import React, { useState } from 'react'
import Input from './Input'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

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
    <form onSubmit={addBlog}>
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
        type="text"
        value={url}
        name="URL"
        onChange={handleUrlChange}
      />
      <button type="submit">add</button>
    </form>
  )
}

export default BlogForm
