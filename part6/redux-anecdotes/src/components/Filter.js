import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = e => {
    // input-field value is in variable e.target.value
    store.dispatch(setFilter(e.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter