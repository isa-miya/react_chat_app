import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6">ログイン</h2>
				<form>
					<input
						type="email"
						name="email"
						placeholder="メールアドレス"
						className="w-full p-3 border rounded mb-4"
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="パスワード"
						className="w-full p-3 border rounded mb-4"
						required
					/>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
					>
						ログイン
					</button>
				</form>
				<p className="mt-4 text-center">
					アカウントをお持ちでないですか？{' '}
					<Link to="/signup" className="text-blue-500 hover:underline">
						サインアップ
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
