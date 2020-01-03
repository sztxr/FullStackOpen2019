import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification === '') return ''

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

export default Notification