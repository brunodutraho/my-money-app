import React from 'react'
import { Link } from 'react-router-dom'

export default function MenuItem({ path, label, icon }) {
  return (
    <li>
      <Link to={path}>
        <i className={`fa fa-${icon}`}></i>
        <span className='menu-label'> {label}</span>
      </Link>
    </li>
  )
}
