import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const OnlyAdmin = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" />
}

export default OnlyAdmin