import React from 'react'
import { useNavigate } from 'react-router'
import { useField } from '../hooks'

const CreateNew = (props) => {
  // omit reset properties from the input fields
  const { reset: clearContentField, ...content } = useField('text')
  const { reset: clearAuthorField, ...author } = useField('text')
  const { reset: clearInfoField, ...info } = useField('url')

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })

    navigate('/')
  }

  const handleReset = () => {
    clearContentField()
    clearAuthorField()
    clearInfoField()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <br />
          <input {...content} />
        </div>
        <div>
          author
          <br />
          <input {...author} />
        </div>
        <div>
          url for more info
          <br />
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
