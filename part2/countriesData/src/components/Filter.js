import React from 'react'

const Filter = ({ value, onChange }) => {
  return (
    <p>Find countries: <input value={value} onChange={onChange} /></p>
  )
}

export default Filter