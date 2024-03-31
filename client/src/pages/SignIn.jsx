import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const {error,loading} = useSelector((state)=> state.user)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const resData = await res.json()
      if(resData.success === false){
        dispatch(signInFailure(resData))
        return;
      }
      dispatch(signInSuccess(resData))
      navigate("/")
    }
    catch(error) {
      dispatch(signInFailure(error))
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
      <p>{error ? error.message || "Something went wrong!!" : ""}</p>
    </div>
  )
}

export default SignIn