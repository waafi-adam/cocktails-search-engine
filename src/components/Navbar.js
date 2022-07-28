import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../logo.svg'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <NavLink to='/'>
          <img src={logo} alt='cocktail-db-logo' className='logo' />
        </NavLink>
        <ul className='nav-links'>
          <li>
            <NavLink to='/'>home</NavLink>
            <NavLink to='/about'>about</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
