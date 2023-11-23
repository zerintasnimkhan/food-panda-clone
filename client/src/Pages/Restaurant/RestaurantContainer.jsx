import React from 'react'
import RestaurantNavBar from '../../components/RestaurantNavBar'
import { Outlet,Link } from 'react-router-dom'

function RestaurantContainer() {
  return (
    <>
      <RestaurantNavBar />
      <div className='flex'>
      <ul className="menu bg-base-200 h-screen">
        <li className='text-lg'><Link to="/restaurant/orders" className='text-primary'>Orders</Link></li>
        <li className='text-lg'><Link to="/restaurant/food" className='text-primary'>Foods</Link></li>
        <li className='text-lg'><Link to="/restaurant/info" className='text-primary'>Info</Link></li>
      </ul>
      <Outlet />
      </div>
    </>
  )
}

export default RestaurantContainer