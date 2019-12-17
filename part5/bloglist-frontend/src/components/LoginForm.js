import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const { handleLogin, username, password, setUsername, setPassword } = props

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={setUsername}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={setPassword}
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm