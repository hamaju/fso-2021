import React from 'react'
import { useHistory } from 'react-router'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const { reset: clearContentField, ...content } = useField('text')
  const { reset: clearAuthorField, ...author } = useField('text')
  const { reset: clearInfoField, ...info } = useField('url')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })

    history.push('/')
  }

  const handleReset = () => {
    // unique identifiers for our useField hooks
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
