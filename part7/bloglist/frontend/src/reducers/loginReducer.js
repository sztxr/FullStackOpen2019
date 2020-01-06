import blogService from '../services/blogs'

const initialState = null

// reducer
const loginReducer = (state = initialState, action) => {
  // console.log('DATA', action.data)
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'SET_TOKEN':
    return {
      ...state,
      token: action.data
    }
  case 'LOGOUT':
    return initialState
  default:
    return state
  }
}

// actions
export const setUser = data => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data
    })
  }
}

export const setToken = data => {
  return async dispatch => {
    await blogService.setToken(data)
    dispatch({
      type: 'SET_TOKEN',
      data
    })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loginReducer