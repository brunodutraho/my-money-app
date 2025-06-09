import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar'

export default function MainHeader() {
  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-collapse')
  }

  return (
    <header className='main-header'>
      <Link to='/#/' className='logo'>
        <span className='logo-mini'>
          <i className='fa fa-money'></i>
        </span>
        <span className='logo-lg'>
          <i className='fa fa-money'></i>
          <span>
            <b> My</b> Money
          </span>
        </span>
      </Link>

      <nav className='navbar navbar-static-top'>
        <button className='sidebar-toggle' onClick={toggleSidebar}>
          <i className='fa fa-bars' />
        </button>
        <Navbar />
      </nav>
    </header>
  )
}
