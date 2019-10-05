import React from 'react'
import Contact from './Contact'

const Contacts = ({ contacts, filter }) => {
  const contactComponent = () => filter.map(contact =>
    <Contact
      key={contact.name}
      contact={contact}
    />
  )

  return (
    <ul>{contactComponent()}</ul>
  )
}

export default Contacts