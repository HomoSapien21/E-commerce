import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [user,setUser] = useState({
    email:"",
    password:""
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      await axios.post('/user/login',{...user});
      localStorage.setItem('firstLogin',true);
      window.location.href = '/';
    }
    catch(error){
      console.log(error.response.data.msg);
    }
  }
  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <input type="email" required placeholder="Email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
        <input type="password" required placeholder="Password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} />
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Don't have an account? Register Now</Link>
        </div>
      </form>
    </div>
  )
}

export default Login