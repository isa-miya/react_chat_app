import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createChatRoom } from '../redux/chatroomsReducer';

import LoadingSpinner from '../components/LoadingSpinner';

const CreateChatRoom = () => {
	const [roomName, setRoomName] = useState('');
	const dispatch = useDispatch();
	const { error, loading } = useSelector((state) => state.chatrooms);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!roomName.trim()) {
			alert('ルーム名を入力してください');
			return;
		}
		dispatch(createChatRoom(roomName));
		setRoomName('');
		navigate('/chat-rooms');
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md bg-white p-6 rounded shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-4">チャットルームを作成</h2>
				{error && <p className="text-red-500 text-center mb-4">{error}</p>}
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="ルーム名"
						className="w-full p-3 border rounded mb-4"
						value={roomName}
						onChange={(e) => setRoomName(e.target.value)}
					/>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
					>
						作成する
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateChatRoom;
