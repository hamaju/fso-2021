import React from 'react'
import Input from './Input'

const BlogForm = ({
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  addBlog,
}) => {
  return (
    <form onSubmit={addBlog}>
      <Input
        label="title"
        type="text"
        value={newTitle}
        name="Title"
        onChange={handleTitleChange}
      />
      <Input
        label="author"
        type="text"
        value={newAuthor}
        name="Author"
        onChange={handleAuthorChange}
      />
      <Input
        label="url"
        type="text"
        value={newUrl}
        name="URL"
        onChange={handleUrlChange}
      />
      <button type="submit">add</button>
    </form>
  )
}

export default BlogForm
