import React from 'react'
import { connect } from 'react-redux'

const UserList = (props) => {
  console.log('user component', props)

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

const mapStateToProps = (state) => {
  console.log('user state', state)
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserList)