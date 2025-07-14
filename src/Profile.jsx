import { Calendar, Mail, Phone, User as UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const Profile = () => {
	const { user, isAuthenticated } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isAuthenticated && user) {
			setLoading(false);
		} else {
			setLoading(false);
		}
	}, [user, isAuthenticated]);

	const formatDate = (dateString) => {
		if (!dateString) return 'Not specified';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const getInitials = (name) => {
		if (!name) return 'U';
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading profile...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated || !user) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Profile Not Found
					</h2>
					<p className="text-gray-600">Please log in to view your profile.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
					<p className="text-gray-600 mt-2">View your account information</p>
				</div>

				{/* Profile Card */}
				<div className="bg-white rounded-lg shadow-sm p-8">
					{/* Profile Picture/Initials */}
					<div className="flex justify-center mb-6">
						<div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center">
							<span className="text-2xl font-bold text-white">
								{getInitials(user.name)}
							</span>
						</div>
					</div>

					{/* Basic Info */}
					<div className="text-center mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-2">
							{user.name || 'User'}
						</h2>
						<p className="text-gray-600">
							Member since {formatDate(user.createdAt)}
						</p>
					</div>

					{/* Profile Details */}
					<div className="space-y-6">
						<div className="grid grid-cols-1 gap-6">
							{/* Personal Information */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Personal Information
								</h3>
								<div className="space-y-4">
									<div className="flex items-center space-x-3">
										<UserIcon className="h-5 w-5 text-gray-400" />
										<div>
											<p className="text-sm font-medium text-gray-500">Name</p>
											<p className="text-gray-900">
												{user.name || 'Not specified'}
											</p>
										</div>
									</div>

									<div className="flex items-center space-x-3">
										<Mail className="h-5 w-5 text-gray-400" />
										<div>
											<p className="text-sm font-medium text-gray-500">Email</p>
											<p className="text-gray-900">
												{user.email || 'Not specified'}
											</p>
										</div>
									</div>

									{user.phone && (
										<div className="flex items-center space-x-3">
											<Phone className="h-5 w-5 text-gray-400" />
											<div>
												<p className="text-sm font-medium text-gray-500">
													Phone
												</p>
												<p className="text-gray-900">{user.phone}</p>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Account Information */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Account Information
								</h3>
								<div className="space-y-4">
									<div className="flex items-center space-x-3">
										<Calendar className="h-5 w-5 text-gray-400" />
										<div>
											<p className="text-sm font-medium text-gray-500">
												Account Created
											</p>
											<p className="text-gray-900">
												{formatDate(user.createdAt)}
											</p>
										</div>
									</div>

									{user.authProvider && (
										<div className="flex items-center space-x-3">
											<UserIcon className="h-5 w-5 text-gray-400" />
											<div>
												<p className="text-sm font-medium text-gray-500">
													Login Method
												</p>
												<p className="text-gray-900 capitalize">
													{user.authProvider}
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
