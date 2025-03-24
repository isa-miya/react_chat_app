import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = () => {
	const { isLoggedIn } = useAuth();
	if (isLoggedIn === null) {
		return <LoadingSpinner />;
	}
	return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
