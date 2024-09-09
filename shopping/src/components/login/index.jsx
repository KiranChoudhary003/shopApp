import React, { useState } from 'react'
import Wrapper from './style'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Login = ({setLoggedInUser}) => {

  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()
    e.target.value = "Loggin in..."
    e.target.disabled = true
    axios.post("http://localhost:8000/api/user/login", {contact, password})
    .then(({data}) => {setLoggedInUser(data)})
    .catch(console.log)
    .finally(_ => {
      setContact('')
      setPassword('')
      e.target.value = "Login"
      e.target.disabled = false
    }) 
  }

  return (
    <Wrapper>
      <div>
      <h1>Login</h1>
      <input type="text"
        placeholder='Contact*'
        pattern='[0-9]{10}'
        required
        value={contact} onChange={e => setContact(e.target.value)}
      />
      <input type="password"
      placeholder='Password'
      required
      value={password} onChange={e => setPassword(e.target.value)} 
      /> 
      <input type="submit"
      value='Login' onClick={login}
      />  
      </div>
      <div>
        <label htmlFor="css">If you want to Create Account</label>
        <Link to  = 'click'> <p>Click Here</p> </Link>
      </div>
    </Wrapper>
  )
}

export default Login
