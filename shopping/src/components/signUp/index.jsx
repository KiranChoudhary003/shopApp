import React, {  useState } from 'react'
import Wrapper from './style'
import axios from 'axios'

const SignUp = ({loggedInUser, setLoggedInUser}) => {

  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')


  const signUp = (e) => {
    e.preventDefault()
    e.target.value = "Signup up..."
    e.target.disabled = true
    axios.post("http://localhost:8000/api/user/add", {name, contact, password})
    .then(({data}) =>{
      if(data.bSuccess){
        alert('Successfully SignUp!!')
      }
    })
    .catch(console.log)
    .finally(_ => {
      setName('')
      setContact('')
      setPassword('')
      e.target.value = "Sign UP"
      e.target.disabled = false
    })
    
  }

  return (
    <Wrapper>
      <div>
        <h1>Sign Up</h1>
        <input 
        type="text"
        placeholder='Name*'
        required 
        value={name} onChange={e => setName(e.target.value)}/>
        <input 
        type="text"
        placeholder='Contact*'
        pattern='[0-9]{10}'
        required
        value={contact} onChange={e => setContact(e.target.value)}/>
 
        <input 
        type="password"
        placeholder='password*'
        required
        value={password} onChange={e => setPassword(e.target.value)}

        />
        <input 
        type="submit"
        value='Sign Up' onClick = {signUp} />
      </div>
     
    </Wrapper>
  )
}

export default SignUp
