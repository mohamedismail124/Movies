/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate } from 'react-router-dom'


function ProtectedRoute({userData,children}) {
 if(!userData==null&localStorage.getItem('token')==null)
 {
    return <Navigate to='/login' /> 
 }
 else{
    return children;
 }
}

export default ProtectedRoute;