import React, { useState } from 'react'

export const useInput = ({ type }) => {
  const [value, setValue] = useState('')
  const input = <input type={type} value={value} onChange={({ target }) => setValue(target.value)} />
  return [value, input]
}

export const useInputChange = () => {
  const [input, setInput] = useState({})

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  return [input, handleInputChange]
}