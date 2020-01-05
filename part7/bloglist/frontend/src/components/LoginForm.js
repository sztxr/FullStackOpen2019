import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const { handleLogin, username, password } = props

  return (
    <form onSubmit={handleLogin} className="loginForm">
      <div>
        username
        <input {...username} reset={null} />
      </div>
      <div>
        password
        <input {...password} reset={null} />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm