import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const { useAuth } = require('../context/AuthContext');

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const { resetMail, error } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		resetMail(email);
		setEmail('');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6">パスワードリセット</h2>
				{error && <p className="text-red-500 text-center mb-4">{error}</p>}
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						name="email"
						placeholder="メールアドレス"
						className="w-full p-3 border rounded mb-4"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required
					/>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-400"
					>
						メール送信
					</button>
				</form>
				<p className="mt-4 text-center">
					<Link to="/login" className="text-blue-500 hover:underline">
						ログインページに戻る
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ForgotPassword;
