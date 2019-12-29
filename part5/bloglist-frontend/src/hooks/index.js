import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = e => { setValue(e.target.value) }

  const reset = () => { setValue('') }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useInput = ({ type }) => {
  const [value, setValue] = useState('')
  const input = <input type={type} value={value} onChange={({ target }) => setValue(target.value)} />
  return [value, input]
}