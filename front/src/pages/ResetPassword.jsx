import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResetPassword = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const [newPassword, setNewPassword] = useState('');
	const { resetPassword, error } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		resetPassword(token, newPassword, navigate);
		setNewPassword('');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6">パスワードリセット</h2>
				{error && <p className="text-red-500 text-center mb-4">{error}</p>}
				<form onSubmit={handleSubmit}>
					<input
						type="password"
						name="newPassword"
						placeholder="新しいパスワード"
						className="w-full p-3 border rounded mb-4"
						onChange={(e) => setNewPassword(e.target.value)}
						value={newPassword}
						required
					/>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
					>
						パスワードをリセット
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
