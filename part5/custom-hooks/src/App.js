import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = e => { setValue(e.target.value) }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(res => res.data)
      .then(data => {
        setResources(data)
      })
  }, [baseUrl])

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then(response => {
        setResources([...resources, response.data]);
      })
  }

  const service = { create }

  return [ resources, service ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [contacts, contactService] = useResource('http://localhost:3005/contacts')

  const handleNoteSubmit = e => {
    e.preventDefault()
    noteService.create({ content: content.value })
  }

  const handleContactSubmit = e => {
    e.preventDefault()
    contactService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>contacts</h2>
      <form onSubmit={handleContactSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {contacts.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App