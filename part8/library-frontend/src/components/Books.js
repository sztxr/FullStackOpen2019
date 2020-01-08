import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const ALL_BOOKS = gql`
  {
    allBooks { 
      title 
      published
      id
      author {
        name
      }
    }
  }
`

const Books = (props) => {
  const response = useQuery(ALL_BOOKS)

  if (!props.show) { return null }
  if (response.loading) return <div>loading...</div>

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
          {response.data.allBooks.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books