import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { ALL_AUTHORS } from './Authors'

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
      editAuthor(name: $name, setBornTo: $setBornTo) {
          name
          born
      }
  }
`

const EditBirthYear = (props) => {
  const defaultAuthor = props.authors.data.allAuthors[0].name
  const [name, setName] = useState(defaultAuthor)
  const [birthYear, setBirthYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (e) => {
    e.preventDefault()
    await editAuthor({
      variables: { name, setBornTo: Number(birthYear) }
    })

    setName(defaultAuthor)
    setBirthYear('')
  }

  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <label>
          Author: <select onChange={({ target }) => setName(target.value)}>
            {props.authors.data.allAuthors.map(a => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
        </label>
        <br/>
        <label>
          Born on: <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </label>
        <br/>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditBirthYear