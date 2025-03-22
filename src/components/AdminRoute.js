import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default AdminRoute;