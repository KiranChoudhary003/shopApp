import React from 'react'
import Wrapper from './style'
import Nav from './nav'
import { Link } from 'react-router-dom'

const Header = ({loggedInUser}) => {
  return (
    <Wrapper>
      <Link to="/"><h1>ShopApp</h1></Link>
      <Nav loggedInUser = {loggedInUser}/>
    </Wrapper>
  )
}

export default Header
