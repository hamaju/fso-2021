import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show }) => {
  const user = useQuery(ME)
  const favoriteGenre = user.data?.me.favoriteGenre
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  })
  const books = data?.allBooks

  if (!show) return null

  if (loading) return <div>loading...</div>
  if (error) return `${error}`

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      {books.length > 0 ? (
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
      ) : (
        <p>no books in your favorite genre</p>
      )}
    </div>
  )
}

export default Recommendations
