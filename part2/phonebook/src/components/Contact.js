import React from 'react'

const Contact = ({ contact, deleteContact }) => {
  return (
    <li className="contact">
      <strong>{contact.name}</strong> &ndash; {contact.phone}
      <button className="btn btn-secondary" onClick={deleteContact}>delete</button>
    </li>
  )
}

export default Contact