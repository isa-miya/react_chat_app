import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getChatRooms, joinChatRoom } from '../redux/chatroomsReducer';
import LoadingSpinner from '../components/LoadingSpinner';

const ChatRooms = () => {
	const dispatch = useDispatch();
	const { chatrooms, error, loading } = useSelector((state) => state.chatrooms);

	useEffect(() => {
		dispatch(getChatRooms());
	}, [dispatch]);

	const handleJoin = (roomId) => {
		dispatch(joinChatRoom(roomId)).then(() => {
			dispatch(getChatRooms());
		});
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <p className="text-center text-red-500">{error}</p>;
	}

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<h1 className="text-3xl font-bold text-center mb-6">チャットルーム一覧</h1>
			<div className="flex justify-end mb-6">
				<Link
					to="/create-chat-room"
					className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
				>
					+ 新しいチャットルームを作成
				</Link>
			</div>
			<div className="grid gap-4">
				{chatrooms.length === 0 ? (
					<p className="text-center text-gray-500">まだチャットルームはありません</p>
				) : (
					chatrooms.map((room, index) => (
						<div
							key={index}
							className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
						>
							<Link to={`/chat-rooms/${room.id}`} className="text-lg font-semibold hover:underline">
								{room.name}
							</Link>
							{!room.isMember && (
								<button
									onClick={() => handleJoin(room.id)}
									className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
								>
									参加
								</button>
							)}
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default ChatRooms;
