import React from 'react'
import { Link } from 'react-router-dom'

const Menu = (props) => {
  const style = {
    container: {
      backgroundColor: 'rgb(23, 115, 124)',
      color: 'white',
    },
    item: {
      padding: 10,
      paddingRight: 15,
      display: 'inline-block',
      color: 'white'
    },
    flex: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }

  return (
    <div style={style.container}>
      <Link href='#' style={style.item} to='/'>blogs</Link>
      <Link href='#' style={style.item} to='/users'>users</Link>
      <div style={{...style.item, ...style.flex}}>
        <strong>{props.user}</strong>&nbsp;logged in
        <button onClick={props.handleLogout} className="btn btn-secondary">logout</button>
    </div>
    </div >
  )
}

export default Menu