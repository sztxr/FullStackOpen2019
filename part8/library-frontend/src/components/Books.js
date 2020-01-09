import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const ALL_BOOKS = gql`
  {
    allBooks { 
      title 
      published
      id
      genres
      author {
        name
      }
    }
  }
`

const Books = (props) => {
  const response = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])
  const [filteredBooks, setFilteredBooks] = useState(null)

  useEffect(() => {
    if (response.data) {
      setFilteredBooks(response.data.allBooks.filter(book => {
        book.genres.forEach(genre => {
          if (!genres.includes(genre)) setGenres(genres.concat(genre))
        })
        return book
      }))
    }
  }, [response.data, genres])

  if (!props.show) return null
  if (response.loading) return <div>loading...</div>

  const filteredBooksByGenre = (filter) => {
    setFilteredBooks(response.data.allBooks.filter(book => book.genres.includes(filter)))
  }

  const allBooks = () => {
    setFilteredBooks(response.data.allBooks.map(book => book))
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
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
      <br />
      <div>
        {genres.map(g => <button key={g} onClick={() => filteredBooksByGenre(g)}>{g}</button>)}
        <button onClick={() => allBooks()}>all genres</button>
      </div>
    </div>
  )
}

export default Books