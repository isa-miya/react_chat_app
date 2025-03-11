import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const navigate = useNavigate();
	const { signup, error } = useAuth();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData, navigate);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6">サインアップ</h2>
				{error && <p className="text-red-500 text-center mb-4">{error}</p>}
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="ユーザー名"
						className="w-full p-3 border rounded mb-4"
						onChange={handleChange}
						value={formData.name}
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="メールアドレス"
						className="w-full p-3 border rounded mb-4"
						onChange={handleChange}
						value={formData.email}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="パスワード"
						className="w-full p-3 border rounded mb-4"
						onChange={handleChange}
						value={formData.password}
						required
					/>
					<button
						type="submit"
						className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
					>
						サインアップ
					</button>
				</form>
				<p className="mt-4 text-center">
					すでにアカウントをお持ちですか？{' '}
					<Link to="/login" className="text-blue-500 hover:underline">
						ログイン
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
