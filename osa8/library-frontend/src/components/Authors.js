import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = ({ show, token, setError }) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  const authors = result.data?.allAuthors
  const options = authors?.map((author) => {
    return {
      value: author.name,
      label: author.name,
    }
  })

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  if (!show) return null

  if (result.loading) return <div>loading...</div>

  const submit = (event) => {
    event.preventDefault()
    updateAuthor({
      variables: { name: selectedOption.value, setBornTo: born },
    })
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            <div>
              born
              <input
                value={born}
                type="number"
                onChange={({ target }) => setBorn(parseInt(target.value))}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Authors
