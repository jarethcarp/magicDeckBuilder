import { useState } from 'react'
import { Outlet, } from 'react-router-dom'
import Header from './pages/Header'

function App() {
  

  return (
    <>
      <div className='bg-primary'>
        <div>
          <Header />
        </div>
        <div className='main'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
