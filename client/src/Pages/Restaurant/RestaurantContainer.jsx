import React from 'react'
import RestaurantNavBar from '../../components/RestaurantNavBar'
import { Outlet } from 'react-router-dom'

function RestaurantContainer() {
  return (
    <>
      <RestaurantNavBar />
      <Outlet />
    </>
  )
}

export default RestaurantContainer