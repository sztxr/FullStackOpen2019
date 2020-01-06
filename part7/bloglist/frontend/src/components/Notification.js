import React from 'react'
import { connect } from 'react-redux'
import { StyledNotification } from './styles/styles'

const Notification = ({ notification }) => {
  // console.log(notification)
  const style = {
    backgroundColor: notification.type === 'success' ? '#58ae5a' : '#b92834'
  }

  if (notification.message === null) return null

  return (
    <StyledNotification className='notification' style={style}>
      {notification.message}
    </StyledNotification>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)