import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserStart,updateUserSuccess, updateUserFailure } from '../redux/user/userSlice'
import { deleteUserStart,deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice'
import { signOut } from '../redux/user/userSlice'

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

  const handleDelete = async()=>{
    try{
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{method: "DELETE"})
      const resData = res.json()
      if(resData.success === false){
        dispatch(deleteUserFailure(resData))
      }
      dispatch(deleteUserSuccess(resData))
    }
    catch(error){
      dispatch(deleteUserFailure(error))  
    }
  }

  const handleSignout = async()=>{
    try{
      await fetch("/api/auth/signout",{method: "GET"})
      dispatch(signOut())
    }
    catch(error){
      console.log(error)  
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
      <p onClick={handleDelete}>Delete Account</p>
      <p onClick={handleSignout}>Sign Out</p>
      <p>{error ? error.message || "Internal Server Error" : ""}</p>
      <p>{isUpdateSuccess && "User updated Successfully"}</p>
    </div>
  )
}

export default Profile