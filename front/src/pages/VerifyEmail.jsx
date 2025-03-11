import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VerifyEmail = () => {
	const { token } = useParams();
	const navigate = useNavigate();

	const { verifyEmail, error } = useAuth();

	useEffect(() => {
		verifyEmail(token, navigate);
	}, [token, navigate, verifyEmail]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
				{error ? (
					<p className="text-red-500">{error}</p>
				) : (
					<p className="text-gray-600">メール認証中です...</p>
				)}
			</div>
		</div>
	);
};

export default VerifyEmail;
