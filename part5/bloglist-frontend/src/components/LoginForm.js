import React from 'react'

const LoginForm = (props) => {
  const { handleLogin, username, password, setUsername, setPassword } = props
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={setUsername}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={setPassword}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm