import React, { useState, useEffect } from 'react'
import contactServices from './services/contact'
import Form from './components/Form'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import Notification from './components/Notification'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    contactServices
      .getAll()
      .then(initialContacts => {
        // console.log(initialContacts)
        setContacts(initialContacts)
      })
  }, [])

  const addContact = e => {
    e.preventDefault()

    const all = contacts.map(item => item.name)
    const contactObj = {
      name: newName,
      phone: newPhone
    }

    if (all.includes(newName)) {
      const contact = contacts.find(item => item.name === newName)

      if (window.confirm(`Contact ${newName} already exist, replace old phone number with one?`)) {
        contactServices
          .update(contact.id, contactObj)
          .then(returnedContact => {
            // console.log(returnedContact)
            setContacts(contacts.map(item => item.name !== newName ? item : returnedContact))
            setNewName('')
            setNewPhone('')

            setSuccessMessage(`Success: '${newName}' has been updated`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(err => {
            setContacts(contacts.filter(item => item.id !== newName.id))
            setErrorMessage(`Error: '${newName}' does not exist`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      return
    }

    contactServices
      .create(contactObj)
      .then(returnedContact => {
        setContacts([...contacts, returnedContact])
        setNewName('')
        setNewPhone('')

        setSuccessMessage(`Success: '${newName} has been added to the phone book'`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const deleteContact = id => {
    const contact = contacts.find(c => c.id === id)

    if (window.confirm(`Delete ${contact.name}?`)) {
      contactServices
        .remove(contact.id)
        .then(() => {
          setContacts(contacts.filter(item => item.id !== id))
          setSuccessMessage(`Success: '${contact.name}' has been deleted from the phone book`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(err => {
          setContacts(contacts.filter(item => item.id !== id))
          setErrorMessage(`Error: '${contact.name}' does not exist`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = e => {
    setNewPhone(e.target.value)
  }

  const handleSearch = e => {
    setFilter(e.target.value)
  }

  const showContacts = filter === ''
    ? contacts
    : contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification success={successMessage} error={errorMessage} />

      <Filter value={filter} onChange={handleSearch} />

      <h2>Add a new contact</h2>
      <Form
        onSubmit={addContact}
        name={{ value: newName, onChange: handleNameChange }}
        phone={{ value: newPhone, onChange: handlePhoneChange }}
      />

      <h2>Numbers</h2>
      <Contacts contacts={showContacts} deleteContact={deleteContact} />
    </div>
  )
}

export default App