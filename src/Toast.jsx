import { AlertCircle, CheckCircle, X } from 'lucide-react';
import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				onClose();
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isVisible, onClose]);

	if (!isVisible) return null;

	return (
		<div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-full duration-300">
			<div
				className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg border max-w-sm ${
					type === 'success'
						? 'bg-green-50 border-green-200 text-green-800'
						: 'bg-red-50 border-red-200 text-red-800'
				}`}>
				{type === 'success' ? (
					<CheckCircle className="w-5 h-5 text-green-600" />
				) : (
					<AlertCircle className="w-5 h-5 text-red-600" />
				)}
				<span className="text-sm font-medium">{message}</span>
				<button
					onClick={onClose}
					className="ml-auto text-gray-400 hover:text-gray-600">
					<X className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
};

export default Toast;
