import React from 'react'

const Notification = ({ success, error}) => {
  // console.log(success, error)

  const style = {
    success: {
      backgroundColor: '#58ae5a',
    },
    error: {
      backgroundColor: 'rgb(185, 40, 52)',
    }
  }

  if (success === null && error === null) return null
  if (success) {
    return (
      <div className='notification' style={style.success}>
        {success}
      </div>
    )
  }
  return (
    <div className='notification' style={style.error}>
      {error}
    </div>
  )
}

export default Notification