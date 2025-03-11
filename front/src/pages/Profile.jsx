import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
	const [profile, setProfile] = useState({});
	const { getProfile, error } = useAuth();

	useEffect(() => {
		(async () => {
			try {
				const user = await getProfile();
				setProfile(user);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [getProfile]);

	return (
		<div className="min-h-screen flex flex-col items-center bg-gray-100">
			<div className="w-full max-w-md bg-white p-6 rounded shadow-lg mt-10">
				<h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
				<div className="flex flex-col items-center">
					<img
						src={
							profile.imageUrl
								? `${process.env.REACT_APP_IMAGE_URL}${profile.imageUrl}`
								: 'https://placehold.jp/3d4070/ffffff/150x150.png'
						}
						alt="User Avatar"
						className="w-24 h-24 rounded-full border mb-4"
					/>
					<p className="text-lg font-semibold">{profile.name}</p>
					<p className="text-gray-600">{profile.email}</p>
					{error && <p className="text-red-500 text-center">{error}</p>}
					<Link to="/edit-profile" className="text-blue-500 hover:underline">
						プロフィールを編集する
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Profile;
