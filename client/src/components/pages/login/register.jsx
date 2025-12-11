import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/user/register', { ...user });
      localStorage.setItem('firstRegister', true);
      window.location.href = '/';
    }
    catch (error) {
      console.log(error.response.data.msg);
    }
  }
  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        <input type="text" required placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <input type="email" required placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="password" required placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Already have an account? Login Now</Link>
        </div>
      </form>
    </div>
  )
}

export default Register