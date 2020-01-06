import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = (props) => {
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
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserList)