import React from 'react'
import Contact from './Contact'

const Contacts = ({ contacts, deleteContact }) => {
  const contactComponent = () => contacts.map(contact =>
    <Contact
      key={contact.id}
      contact={contact}
      deleteContact={() => deleteContact(contact.id)}
    />
  )

  return (
    <ul>{contactComponent()}</ul>
  )
}

export default Contacts