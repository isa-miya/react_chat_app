import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6">サインアップ</h2>
				<form>
					<input
						type="text"
						name="name"
						placeholder="ユーザー名"
						className="w-full p-3 border rounded mb-4"
						required
					/>
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
