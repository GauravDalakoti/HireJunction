import React from 'react'
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ authentication = true, children }) => {

    const userToken = localStorage.getItem("userToken")

    return userToken ? children : <Navigate to="/login" />;

};

export default UserProtectedRoute