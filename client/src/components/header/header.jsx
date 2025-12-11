import React from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
const Header = () => {
  const state = useContext(GlobalState)
  const [isLogged,setIsLogged] = state.userAPI.isLogged;
  const [isAdmin,setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const logoutUser = async () => {
      await axios.get('/user/logout')
      localStorage.clear()
      setIsAdmin(false)
      setIsLogged(false)
  }

  const adminRouter = ()=>{
    return(
      <>
        <li><Link to='/create_product'>Create Product</Link></li>
        <li><Link to='/category'>Categories</Link></li>

      </>
    )
  }

  const loggedRouter = ()=>{
    return(
      <>
        <li><Link to='/history'>History</Link></li>
        <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
        
      </>
    )
  }

  return (
    <header>
      <div className="menu">
        <IoMdMenu size={25}/>
      </div>

      <div className="logo">
        <h3>
          <Link to="/">{isAdmin ? "Admin" : "MyShop"}</Link>
        </h3>
      </div>

      <ul>
        <li><Link to="">{isAdmin ? "Products" : "Shop"}</Link></li>
        {isAdmin && adminRouter()}
        {
          isLogged ? loggedRouter() : <li><Link to="/login">Login or Register</Link></li>
        }
        <li><IoMdClose className="menu" size={25}/></li>
      </ul>

      {
        isAdmin ? '' :       <div className="cart-icon">
        <span className="cart-count">{cart.length}</span>
        <Link to="/cart"><IoMdCart size={25}/></Link>
      </div>
      }


    </header>
  )
}

export default Header