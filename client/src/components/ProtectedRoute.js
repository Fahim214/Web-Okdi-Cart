import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  return userInfo ? <Outlet /> : <Navigate to="/login" />
 }

export default ProtectedRoute