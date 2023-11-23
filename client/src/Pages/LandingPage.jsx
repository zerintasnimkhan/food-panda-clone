import React from 'react'
import AppNavbar from '../components/Navbar'

function LandingPage() {
  return (
    <>
    <div>
      <AppNavbar />
    </div>
    <div className='top-heding'>
    <h1 className="text-5xl p-20">It's the food you love, delivered.</h1>
    </div>
    <form className='top-form'>
      <div className='form-search'>
        <input type='search' placeholder='Enter your bock & area'></input>
      </div>
    <button className='text-xl btn btn-primary'>find food</button>
    </form>
    </>
  )
}

export default LandingPage