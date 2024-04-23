import React from 'react'
import Profile from './Profile'

const Navbar = () => {
  return (
    <div className='flex justify-between h-20 bg-fuchsia-700 items-center'>
        <div className='logo m-20'>
        LOGO
        </div>
        <div className='account m-20'>
        <Profile/>
        </div>
    </div>
  )
}

export default Navbar