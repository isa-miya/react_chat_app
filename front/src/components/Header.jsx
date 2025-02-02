import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="bg-blue-500 text-white py-4">
			<div className="container mx-auto flex justify-between items-center px-6">
				<h1 className="text-2xl font-bold">Chat App</h1>
				<nav className="flex gap-4">
					<Link to="/" className="hover:underline">
						Home
					</Link>
					<Link to="/profile" className="hover:underline">
						Profile
					</Link>
					<Link to="/logout" className="hover:underline">
						Log Out
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
