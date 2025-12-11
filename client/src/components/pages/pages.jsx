import React from 'react'
import Products from './products/products'
import Login from './login/login'
import Register from './login/register'
import Cart from './cart/cart'
import Product from './utils/ProductDetails/product'
import {Route, Routes} from 'react-router-dom'

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} /> 
      <Route path="/cart" element={<Cart />} /> 
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  )
}

export default Pages