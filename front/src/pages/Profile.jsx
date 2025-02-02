import React from 'react';

const Profile = () => {
	return (
		<div className="min-h-screen flex flex-col items-center bg-gray-100">
			<div className="w-full max-w-md bg-white p-6 rounded shadow-lg mt-10">
				<h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
				<div className="flex flex-col items-center">
					<img
						src="https://placehold.jp/3d4070/ffffff/150x150.png"
						alt="User Avatar"
						className="w-24 h-24 rounded-full border mb-4"
					/>
					<p className="text-lg font-semibold">Test User</p>
					<p className="text-gray-600">test@example.com</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
