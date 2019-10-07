import React from 'react'
import Contact from './Contact'

const Contacts = ({ contacts }) => {
  const contactComponent = () => contacts.map(contact =>
    <Contact
      key={contact.id}
      contact={contact}
    />
  )

  return (
    <ul>{contactComponent()}</ul>
  )
}

export default Contacts