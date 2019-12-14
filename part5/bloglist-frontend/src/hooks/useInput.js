import React, { useState } from 'react'

export const useInput = ({ type }) => {
  const [value, setValue] = useState('')
  const input = <input type={type} value={value} onChange={({ target }) => setValue(target.value)} />
  return [value, input]
}