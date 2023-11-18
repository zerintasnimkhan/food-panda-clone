import React from 'react'
import CustomerNavBar from '../../components/CustomerNavBar'
import { Outlet } from 'react-router-dom'

function CustomerContainer() {
  return (
    <>
      <CustomerNavBar />
      <Outlet />
    </>
  )
}

export default CustomerContainer