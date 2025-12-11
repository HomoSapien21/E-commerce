import React, { useContext } from 'react'
import Products from './products/products'
import Login from './login/login'
import Register from './login/register'
import Cart from './cart/cart'
import Product from './utils/ProductDetails/product'
import CreateProduct from './createProduct/createProduct'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import OrderHistory from './history/OrderHistory'
import { GlobalState } from '../../GlobalState'

import { Route, Routes } from 'react-router-dom'

const Pages = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
      <Route path="/register" element={isLogged ? <NotFound /> : <Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<Product />} />

      <Route path="/category" element={isAdmin ? <Categories /> : <NotFound />} />
      <Route path="/history" element={isLogged ? <OrderHistory /> : <NotFound />} />

      <Route path="/create_product" element={isAdmin ? <CreateProduct /> : <NotFound />} />
      <Route path="/edit_product/:id" element={isAdmin ? <CreateProduct /> : <NotFound />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Pages