import React from 'react'
import Wrapper from './style'
import { Link } from 'react-router-dom'

const Nav = ({loggedInUser}) => {
  return (
    <Wrapper>
        <ul>
          {
          loggedInUser ? 
            (<>
              <li><Link to="about">About</Link></li>
              <li><Link to="contact">Contact</Link></li>
              <li><Link to="products">Product</Link></li>
              <li><Link to="addProduct">Add Product</Link></li>
              </>
            )
            :<li><Link to='/'>Login</Link></li>
          }
        </ul>
    </Wrapper>
  )
}

export default Nav
