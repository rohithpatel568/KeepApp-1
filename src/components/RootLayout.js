import NavigationBar from './navigationbar/NavigationBar'
import { Outlet } from 'react-router-dom'
import React from 'react'

function RootLayout() {
  return (
    <div>
      {/* Navigation Bar */}
      <NavigationBar />
      {/* Outlet */}
      <div className='container'>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout