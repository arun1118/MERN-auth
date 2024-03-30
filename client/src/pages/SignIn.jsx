import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
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
      const res = await fetch("/api/auth/signin",{
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
      navigate("/")
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
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" id="username" onChange={handleChange} />
        <input type="password" placeholder="password" id="password" onChange={handleChange} />
        <button> {loading ? "Loading" : "Sign In"} </button>
      </form>
      <Link to="/signup"><p>sign up?</p></Link>
      <p>{error && "Something went wrong!!"}</p>
    </div>
  )
}

export default SignIn