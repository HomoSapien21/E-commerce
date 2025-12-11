import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { IoMdTrash, IoMdAdd, IoMdRemove } from "react-icons/io";

const Cart = () => {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [token] = state.token
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)
      setTotal(total)
    }
    getTotal()
  }, [cart])

  const addToCart = async (cart) => {
    await axios.patch('/user/addcart', { cart }, {
      headers: { Authorization: token }
    })
  }

  const increment = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity += 1
      }
    })
    setCart([...cart])
    addToCart(cart)
  }

  const decrement = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    })
    setCart([...cart])
    addToCart(cart)
  }

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1)
        }
      })
      setCart([...cart])
      addToCart(cart)
    }
  }

  const tranSuccess = async () => {
    setCart([])
    await addToCart([])
    alert("Thank you for shopping")
  }

  if (cart.length === 0)
    return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>

  return (
    <div className='cart-page'>
      {
        cart.map(product => (
          <div className="cart-card" key={product._id}>
            <img src={product.images.url} alt="" className='cart-img' />

            <div className="box-detail">
              <h2 className='cart-title'>{product.title}</h2>

              <h3 className='cart-price'>$ {product.price * product.quantity}</h3>
              <p className='cart-description'>{product.description}</p>
              <p className='cart-content'>{product.content}</p>

              <div className="amount">
                <button onClick={() => decrement(product._id)}> <IoMdRemove /> </button>
                <span>{product.quantity}</span>
                <button onClick={() => increment(product._id)}> <IoMdAdd /> </button>
              </div>

              <div className="delete" onClick={() => removeProduct(product._id)}>
                <IoMdTrash size={25} />
              </div>
            </div>
          </div>
        ))
      }

      <div className="total">
        <h3>Total: $ {total}</h3>
        <Link to="#!" onClick={tranSuccess}>Complete Shopping</Link>
      </div>
    </div>
  )
}

export default Cart