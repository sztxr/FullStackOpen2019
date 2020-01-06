import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input } from './styles/styles'

const LoginForm = (props) => {
  const { handleLogin, username, password } = props

  return (
    <form onSubmit={handleLogin} className="loginForm">
      <div>
        username
        <Input {...username} reset={null} />
      </div>
      <div>
        password
        <Input {...password} reset={null} />
      </div>
      <Button primary type="submit">Login</Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm