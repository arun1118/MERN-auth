import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserStart,updateUserSuccess, updateUserFailure } from '../redux/user/userSlice'

const Profile = () => {
  const [formData, setFormData] = useState({})
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)

  const dispatch = useDispatch()
  const {currentUser, loading, error} = useSelector((state)=> state.user)
  
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const resData = await res.json()
      if(resData.success === false){
        dispatch(updateUserFailure(resData))
      }
      dispatch(updateUserSuccess(resData))
      setIsUpdateSuccess(true)
    }
    catch(error){
      dispatch(updateUserFailure(error))
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" defaultValue={currentUser.username} id="username" onChange={handleChange}/>
        <input type="email" defaultValue={currentUser.email} id="email" onChange={handleChange}/>
        <input type="password" id="password" onChange={handleChange}/>
        <button>{loading ? "Loading" : "Update"}</button>
      </form>
      <p>{error ? error.message || "Internal Server Error" : ""}</p>
      <p>{isUpdateSuccess && "User updated Successfully"}</p>
    </div>
  )
}

export default Profile