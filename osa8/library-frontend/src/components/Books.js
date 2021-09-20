import React from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const books = result.data?.allBooks
  let genres = result.data?.allBooks.flatMap((book) => book.genres)
  genres = [...new Set(genres)]

  const [fetchBooks] = useLazyQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const handleClick = (event) => {
    // const filteredBooks = books.filter((book) =>
    //   book.genres.includes(event.target.value)
    // )
    // console.log(filteredBooks)

    fetchBooks({
      variables: { genre: event.target.value },
    })
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
        <button key={genre} value={genre} onClick={handleClick}>
          {genre}
        </button>
      ))}
      <button>all genres</button>
    </div>
  )
}

export default Books
