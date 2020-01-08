import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { ALL_BOOKS } from './Books'

export const ME = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`

const Recommended = (props) => {
  const me = useQuery(ME)
  const books = useQuery(ALL_BOOKS)
  const [filteredBooks, setFilteredBooks] = useState(null)

  useEffect(() => {
    if (books.data && me.data) {
      setFilteredBooks(books.data.allBooks.filter(
        book => book.genres.includes(me.data.me.favoriteGenre)
      ))
    }
  }, [books.data, me.data])

  if (!props.show) { return null }
  if (me.loading) return <div>loading...</div>

  return (
    <div>
      <h2>recommended</h2>
      <p>books in your favorite genre <strong>{me.data.me.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended