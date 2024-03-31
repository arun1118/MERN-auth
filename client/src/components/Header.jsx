import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div>
        <h3> <Link to="/">Auth App</Link> </h3>
        <p>{currentUser && `Hello ${currentUser.username}`}</p>
        <ul>
            <li> <Link to="/"> Home </Link> </li>
            <li> <Link to="/help"> About </Link> </li>
            <li>
              {
              currentUser
              ? 
              <Link to="/profile"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAp9ku8Ru5l35iBPya7kLO1T5Xe7pUTdODN7jnYuxLw&s" alt="profile" /> </Link> 
              : 
              <Link to="/signin"> Sign In </Link>
              }  
            </li>
        </ul>
    </div>
  )
}

export default Header