import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS)
  const books = data?.allBooks

  const result = useQuery(ALL_BOOKS)
  let genres = result.data?.allBooks.map((book) => book.genres).flat()
  genres = [...new Set(genres)]

  useEffect(() => {
    getBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!show) return null

  if (loading) return <div>loading...</div>
  if (error) return `Error! ${error}`

  const handleGenreClick = (event) => {
    const genre = event.target.value

    getBooks({
      variables: { genre },
    })
  }

  const handleAllGenresClick = () => {
    getBooks()
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((author) => (
            <tr key={author.title}>
              <td>{author.title}</td>
              <td>{author.author.name}</td>
              <td>{author.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} value={genre} onClick={handleGenreClick}>
          {genre}
        </button>
      ))}
      <button onClick={handleAllGenresClick}>all genres</button>
    </div>
  )
}

export default Books
