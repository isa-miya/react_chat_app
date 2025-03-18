import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { leaveChatRoom } from '../redux/chatroomsReducer';

const ChatRoom = () => {
	const messages = [
		{ sender: 'user1', text: 'Message1' },
		{ sender: 'user2', text: 'Message2' },
		{ sender: 'user3', text: 'Message3' },
	];
	const { roomId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLeaveChatRoom = () => {
		dispatch(leaveChatRoom(roomId));
		navigate('/chat-rooms');
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col p-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-center">チャットルーム</h1>
				<button
					onClick={handleLeaveChatRoom}
					className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
				>
					退出する
				</button>
			</div>
			<div className="flex-1 bg-white p-4 rounded-lg shadow-md overflow-auto">
				{messages.map((msg, index) => (
					<p key={index} className="mb-2">
						<strong>{msg.sender}: </strong> {msg.text}
					</p>
				))}
			</div>
			<div className="flex mt-4">
				<input type="text" className="flex-1 p-2 border rounded" />
				<button className="bg-blue-500 text-white p-2 rounded ml-2">送信</button>
			</div>
		</div>
	);
};

export default ChatRoom;
