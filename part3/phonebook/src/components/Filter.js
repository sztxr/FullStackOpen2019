import React from 'react'

const Filter = ({ value, onChange }) => {
  return (
    <p>Search: <input value={value} onChange={onChange} /></p>
  )
}

export default Filter