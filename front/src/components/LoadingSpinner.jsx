import React from 'react';

const LoadingSpinner = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="flex flex-col items-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
				<p className="mt-4 text-lg text-gray-600">Loading...</p>
			</div>
		</div>
	);
};

export default LoadingSpinner;
