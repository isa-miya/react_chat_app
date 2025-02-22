import React from 'react';
import Header from '../components/Header';

const DefaultLayout = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};

export default DefaultLayout;
