import React, { useEffect, useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/about'
import Contact from './components/contact'
import Login from './components/login'
import Products from './components/products'
import AddProduct from './components/addproduct'
import SignUp from './components/signUp'

const App = () => {

  const [loggedInUser, setLoggedInUser] = useState(null)

  const [products , setProducts] = useState(window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [])

  useEffect (() => {
    window.localStorage.setItem('products', JSON.stringify(products))
  },[products])
  return (
    <BrowserRouter>
      <Header loggedInUser = {loggedInUser}/>
        <Routes>
          <Route path='/about' element = {<About />} />
          <Route path='/contact' element = {<Contact />} />
          <Route path='/products' element ={<Products products={products} setProducts = {setProducts} />} />
          <Route path='/addProduct' element ={<AddProduct setProducts={setProducts} products = {products}/>} />
          <Route path='/*' element = {loggedInUser ? <h1>Welcome User</h1> : <Login loggedInUser = {loggedInUser} setLoggedInUser = {setLoggedInUser}/>} />
          <Route path='/*' element = {loggedInUser ? <h1>Welcome User</h1> : <Login loggedInUser = {loggedInUser} setLoggedInUser = {setLoggedInUser}/>} />
          <Route path='/*' element = {loggedInUser ? <h1>Welcome User</h1> : <Login loggedInUser = {loggedInUser} setLoggedInUser = {setLoggedInUser}/>} />
          <Route path='/click' element = {<SignUp  loggedInUser = {loggedInUser} setLoggedInUser = {setLoggedInUser}/>} />
        </Routes>
      <Footer />
    </BrowserRouter>
  )
  
}

export default App
