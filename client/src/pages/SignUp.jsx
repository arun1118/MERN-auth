import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      setError(false)
      const res = await fetch("/api/auth/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const resData = await res.json()
      setLoading(false)
      if(resData.success === false){
        setError(true)
        return;
      }
      navigate("/signin")
    }
    catch(error) {
      setLoading(false)
      setError(true)
      console.log("err",error)
    }
    setFormData({})
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" id="username" onChange={handleChange} />
        <input type="email" placeholder="email" id="email" onChange={handleChange} />
        <input type="password" placeholder="password" id="password" onChange={handleChange} />
        <button> {loading ? "Loading" : "Sign Up"} </button>
      </form>
      <Link to="/signin"><p>sign in?</p></Link>
      <p>{error && "Something went wrong!!"}</p>
    </div>
  )
}

export default SignUp