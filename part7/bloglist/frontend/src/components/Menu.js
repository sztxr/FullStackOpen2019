import React from 'react'
// import { Link } from 'react-router-dom'
import { Button, Navbar, Navbar__user, StyledLink } from './styles/styles'

const Menu = (props) => {
  return (
    <Navbar>
      <StyledLink href='#' to='/'>blogs</StyledLink>
      <StyledLink href='#' to='/users'>users</StyledLink>
      <Navbar__user>
        <strong>{props.user}</strong>&nbsp;logged in
        <Button secondary onClick={props.handleLogout}>logout</Button>
      </Navbar__user>
    </Navbar>
  )
}

export default Menu