import React from 'react'

const Notification = ({ notification }) => {
  // console.log(notification)
  const style = {
    backgroundColor: notification.type === 'success' ? '#58ae5a' : '#b92834'
  }

  if (notification.message === null) return null

  return (
    <div className='notification' style={style}>
      {notification.message}
    </div>
  )
}

export default Notification