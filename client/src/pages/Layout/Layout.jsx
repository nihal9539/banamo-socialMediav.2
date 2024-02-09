import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='w-full h-full ' style={{background:"#0A0A0A"}}>

      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default Layout
