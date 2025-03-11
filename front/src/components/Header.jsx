import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const Header = () => {
	const { isLoggedIn, signout } = useAuth();
	const navigate = useNavigate();

	const handleSignout = () => {
		signout(navigate);
	};

	return (
		<header className="bg-blue-500 text-white py-4">
			<div className="container mx-auto flex justify-between items-center px-6">
				<h1 className="text-2xl font-bold">Chat App</h1>
				<nav className="flex gap-4">
					<Link to="/" className="hover:underline">
						Home
					</Link>
					{isLoggedIn ? (
						<>
							<Link to="/profile" className="hover:underline">
								Profile
							</Link>
							<button onClick={handleSignout} className="hover:underline">
								Log Out
							</button>
						</>
					) : (
						<>
							<Link to="/signup" className="hover:underline">
								Sign Up
							</Link>
							<Link to="/login" className="hover:underline">
								Log In
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
