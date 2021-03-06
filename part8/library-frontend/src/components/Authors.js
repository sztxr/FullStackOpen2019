import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import EditBirthYear from './EditBirthYear'

export const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
      id
      books {
        title
      }
    }
  }
`

const Authors = (props) => {
  const response = useQuery(ALL_AUTHORS)

  if (!props.show) { return null }
  if (response.loading) return <div>loading...</div>
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {response.data.allAuthors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {props.token === null
        ? null
        : <EditBirthYear authors={response} />  
      }
    </div>
  )
}

export default Authors