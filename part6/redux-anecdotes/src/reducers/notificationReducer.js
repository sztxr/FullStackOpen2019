const initialState = null

const notificationReducer = (state = initialState, action) => {
  // console.log('ACTION: ', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = notification => {
  return {
    type: 'SET_NOTIFICATION',
    data: notification
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

// export const setTimedNotification = (message, store) => {
//   store.dispatch(setNotification(message))
//   setTimeout(() => {store.dispatch(clearNotification())}, 5000)
// }

export default notificationReducer