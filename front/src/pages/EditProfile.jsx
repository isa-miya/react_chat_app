import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EditProfile = () => {
	const { getProfile, editProfile } = useAuth();

	const [formData, setFormData] = useState({
		name: '',
		image: null,
		imageUrl: '',
	});
	const navigate = useNavigate();

	useEffect(() => {
		try {
			(async () => {
				const profile = await getProfile();

				setFormData({
					name: profile.name,
					image: null,
					imageUrl: `${process.env.REACT_APP_IMAGE_URL}${profile.imageUrl}` || '',
				});
			})();
		} catch (err) {
			console.error(err);
		}
	}, [getProfile]);

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'image' && files.length > 0) {
			setFormData((prevData) => ({
				...prevData,
				image: files[0],
				imageUrl: URL.createObjectURL(files[0]),
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, image } = formData;
		const updatedData = new FormData();
		updatedData.append('name', name);
		if (image) updatedData.append('image', image);
		try {
			await editProfile(updatedData, navigate);
			alert('プロフィールが更新されました');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center bg-gray-100">
			<div className="w-full max-w-md bg-white p-6 rounded shadow-lg mt-10">
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col items-center mb-4">
						<img
							src={`${formData.imageUrl}` || 'https://placehold.jp/3d4070/ffffff/150x150.png'}
							alt="プロフィール画像"
							className="w-24 h-24 rounded-full border mb-4"
						/>
						<input
							type="file"
							name="image"
							accept="image/*"
							onChange={handleChange}
							className="text-center"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="name">名前</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full p-2 border rounded"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
					>
						更新する
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
