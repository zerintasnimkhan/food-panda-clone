import React from 'react'
import RestaurantNavBar from '../../components/RestaurantNavBar'
import { Outlet } from 'react-router-dom'

function RestaurantContainer() {
  return (
    <>
      <RestaurantNavBar />
      <div className='flex'>
      <ul className="menu bg-base-200 h-screen">
        <li><a className='text-primary'>Orders</a></li>
        <li><a className='text-primary'>Food</a></li>
        <li><a className='text-primary'>Info</a></li>
      </ul>
      <Outlet />
      </div>
    </>
  )
}

export default RestaurantContainer