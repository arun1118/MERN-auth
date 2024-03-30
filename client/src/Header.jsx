import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <h3> <Link to="/">Auth App</Link> </h3>
        <ul>
            <li> <Link to="/"> Home </Link> </li>
            <li> <Link to="/help"> About </Link> </li>
            <li> <Link to="/signin"> Sign In </Link> </li>
        </ul>
    </div>
  )
}

export default Header