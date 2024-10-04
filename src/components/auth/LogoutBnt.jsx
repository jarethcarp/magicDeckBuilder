import React from 'react'

const LogoutBnt = ({ onLogout }) => {
  return (
    <form onSubmit={onLogout} className='navButton'>
        <button type='submit'>Logout</button>
    </form>
  )
}

export default LogoutBnt