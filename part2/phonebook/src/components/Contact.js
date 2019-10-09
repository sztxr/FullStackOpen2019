import React from 'react'

const Contact = ({ contact, deleteContact }) => {
  return (
    <li>
      {contact.name} {contact.phone}
      <button onClick={deleteContact}>delete</button>
    </li>
  )
}

export default Contact