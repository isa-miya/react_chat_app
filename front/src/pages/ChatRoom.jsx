import React from 'react';

const ChatRoom = () => {
	const messages = [
		{ sender: 'user1', text: 'Message1' },
		{ sender: 'user2', text: 'Message2' },
		{ sender: 'user3', text: 'Message3' },
	];

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col p-4">
			<h1 className="text-2xl font-bold text-center">チャットルーム</h1>
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
