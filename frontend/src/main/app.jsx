import React from 'react'
import ValidationMessages from '../common/msg/validationMessages'
import Footer from '../common/template/footer'
import Header from '../common/template/header'
import SideBar from '../common/template/sideBar'
import { Outlet } from 'react-router-dom'

export default props => (
  <div className='wrapper'>
    <Header />
    <SideBar />
    <div className='content-wrapper'>
      <Outlet />
    </div>
    <Footer />
    <ValidationMessages />
  </div>
)
