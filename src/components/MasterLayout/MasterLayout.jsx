import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function MasterLayout({userData,logout}) {
  return (
    <>
    <Navbar userData={userData} logout={logout} />
    <div className='container'>
    <Outlet/>
    </div>
    
    </>
  )
}

export default MasterLayout