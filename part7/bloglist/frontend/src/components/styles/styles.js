import styled from 'styled-components'
import { Link } from 'react-router-dom'

// MENU
export const Navbar = styled.div`
  background-color: rgb(23, 115, 124);
  color: white;
`

export const Navbar__user = styled.div`
  padding: 10px;
  paddingRight: 15px;
  display: inline-block;
  color: white;
  display: inline-flex;
  alignItems: center;
`
export const StyledLink = styled(Link)`
  padding: 10px;
  paddingRight: 15px;
  display: inline-block;
  color: white;
`

// BlOG FORM
export const DashedContainer = styled.div`
  border: 2px dashed rgb(37, 70, 73);
  margin: 10px 0;
  padding: 15px;

  & h2 {
    margin-top: 0;
  }
`

// NOTIFICATION
export const StyledNotification = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
`

// INPUT
export const Input = styled.input`
  box-shadow: none;
  outline: none;
  border: 1px solid rgb(122, 142, 144);
  border-radius: 3px;
  background-color: rgb(232, 240, 254);
  padding: 5px;
  margin: 1px 0;
`

// BUTTONS
export const Button = styled.button`
  background-color: ${props => props.primary ? 'rgb(88, 167, 174)' : 'rgb(37, 70, 73)'};
  box-shadow: 0px 4px 0px ${props => props.primary ? 'rgb(23, 115, 124)' : 'rgb(9, 44, 47)'};
  color: white;
  border: unset;
  outline: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  font-size: 10px;
  font-weight: bolder;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;

  &:active {
    box-shadow: 0px 1px 0px ${props => props.primary ? 'rgb(23, 115, 124)' : 'rgb(9, 44, 47)'};
    position: relative;
    top: 2px;
  }
`

export const ButtonLike = styled(Button)`
  background-color: rgb(88, 167, 174);
  box-shadow: none;
  margin-left: 5px;
  padding: 0 5px;
  font-size: 15px;
  line-height: 25px;
`

export const ButtonDelete = styled(Button)`
  background-color: rgb(124, 54, 54);
  box-shadow: none;
  padding: 4px 5px;
  font-size: 9px;
`