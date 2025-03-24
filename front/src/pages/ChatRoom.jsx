import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// # socket.io-clientをインポート
import { io } from 'socket.io-client';

import { leaveChatRoom } from '../redux/chatroomsReducer';
import { sendMessage, getMessages, updateMessage, deleteMessage } from '../redux/messagesReducer';
import LoadingSpinner from '../components/LoadingSpinner';

import { useAuth } from '../context/AuthContext';

const ChatRoom = () => {
	const [content, setContent] = useState('');
	const [editMessageId, setEditMessageId] = useState(null);
	const [editContent, setEditContent] = useState('');

	const { messages, error, loading } = useSelector((state) => state.messages);
	const { roomId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useAuth();

	const socketRef = useRef(null);

	useEffect(() => {
		dispatch(getMessages({ roomId }));
		socketRef.current = io(process.env.REACT_APP_SOCKET_URL, {
			withCredentials: true,
		});
		socketRef.current.emit('joinRoom', roomId);
		socketRef.current.on('newMessage', () => {
			dispatch(getMessages({ roomId }));
		});
		return () => {
			socketRef.current.disconnect();
		};
	}, [dispatch, roomId]);

	const handleLeaveChatRoom = () => {
		dispatch(leaveChatRoom(roomId));
		navigate('/chat-rooms');
	};

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (!content.trim()) return;
		dispatch(sendMessage({ roomId, content })).then(() => {
			dispatch(getMessages({ roomId }));
			socketRef.current.emit('newMessage', roomId);
		});
		setContent('');
	};

	const handleEditClick = (msg) => {
		setEditMessageId(msg.id);
		setEditContent(msg.content);
	};

	const handleUpdateMessage = (e) => {
		e.preventDefault();
		dispatch(updateMessage({ id: editMessageId, content: editContent })).then(() => {
			dispatch(getMessages({ roomId }));
			socketRef.current.emit('newMessage', roomId);
			setEditMessageId(null);
			setEditContent('');
		});
	};

	const handleDeleteMessage = (msgId) => {
		const confirmDelete = window.confirm('このメッセージを削除しますか？');
		if (confirmDelete) {
			dispatch(deleteMessage({ msgId })).then(() => {
				dispatch(getMessages({ roomId }));
				socketRef.current.emit('newMessage', roomId);
			});
		}
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	if (!user) {
		return <LoadingSpinner />;
	}

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
				{messages.flat().map((msg, index) => (
					<div
						key={index}
						className={`mb-2 relative group ${
							msg.user?.id === user?.userId ? 'text-right' : 'text-left'
						}`}
					>
						{editMessageId === msg.id ? (
							<form onSubmit={handleUpdateMessage} className="flex justify-end gap-2">
								<input
									type="text"
									value={editContent}
									onChange={(e) => setEditContent(e.target.value)}
									className="p-1 border rounded w-1/2 inline-block"
								/>
								<button
									type="submit"
									className="absolute right-0 -bottom-6 text-sm ml-2 text-blue-500 hover:underline"
								>
									更新
								</button>
							</form>
						) : (
							<>
								{msg.userId !== user?.userId && (
									<strong className="block text-gray-600">{msg.user?.name}</strong>
								)}
								<span className="inline-block px-3 py-1">{msg.content}</span>
								{msg.userId === user?.userId && (
									<div className="justify-end hidden group-hover:flex gap-2">
										<button
											onClick={() => handleEditClick(msg)}
											className="text-sm text-blue-500 hover:underline"
										>
											編集
										</button>
										<button
											onClick={() => handleDeleteMessage(msg.id)}
											className="text-sm text-blue-500 hover:underline"
										>
											削除
										</button>
									</div>
								)}
							</>
						)}
					</div>
				))}
			</div>
			{error && <p className="text-red-500 text-center">{error}</p>}
			<form onSubmit={handleSendMessage} className="flex mt-4">
				<input
					type="text"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="flex-1 p-2 border rounded"
				/>
				<button className="bg-blue-500 text-white p-2 rounded ml-2">送信</button>
			</form>
		</div>
	);
};

export default ChatRoom;
