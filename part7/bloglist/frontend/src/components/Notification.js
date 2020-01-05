import React from 'react'
import { connect } from 'react-redux'

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

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)