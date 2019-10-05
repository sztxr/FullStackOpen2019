import React, { useState } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Contacts from './components/Contacts'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const addContact = (e) => {
    e.preventDefault()

    const all = contacts.map(item => item.name)
    if (all.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const contactObj = {
      name: newName,
      phone: newPhone
    }

    setContacts([...contacts, contactObj])
    setNewName('')
    setNewPhone('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const handleSearch = (e) => {
    setFilter(e.target.value)
  }

  const showContacts = filter === ''
    ? contacts
    : contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleSearch} />

      <h2>Add a new contact</h2>
      <Form
        onSubmit={addContact}
        name={{ value: newName, onChange: handleNameChange}}
        phone={{ value: newPhone, onChange: handlePhoneChange}}
      />

      <h2>Numbers</h2>
      <Contacts contacts={contacts} filter={showContacts}/>
    </div>
  )
}

export default App