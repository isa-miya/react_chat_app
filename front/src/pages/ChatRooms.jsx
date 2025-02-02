import React from 'react';
import { Link } from 'react-router-dom';

const ChatRooms = () => {
	const rooms = ['Room1', 'Room2', 'Room3'];

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<h1 className="text-3xl font-bold text-center mb-6">チャットルーム一覧</h1>
			<div className="grid gap-4">
				{rooms.map((room, index) => (
					<Link
						key={index}
						to={`/chat-rooms/${room}`}
						className="block bg-white p-4 rounded-lg shadow-md hover:bg-gray-200"
					>
						{room}
					</Link>
				))}
			</div>
		</div>
	);
};

export default ChatRooms;
