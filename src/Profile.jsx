import {
	Calendar,
	Edit2,
	Mail,
	Phone,
	Save,
	Upload,
	User as UserIcon,
	X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import api from './api';
import { useAuth } from './AuthContext';

const Profile = () => {
	const { user: authUser, isAuthenticated, showToast } = useAuth();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState({
		name: '',
		profileImage: '',
	});
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState('');

	// Fetch user profile from backend
	useEffect(() => {
		const fetchUserProfile = async () => {
			if (!isAuthenticated) {
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const response = await api.users.getUserProfile();

				if (response.user) {
					setUser(response.user);
					setEditData({
						name: response.user.name || '',
						profileImage: response.user.profileImage || '',
					});
				}
			} catch (error) {
				console.error('Failed to fetch user profile:', error);
				// Fallback to AuthContext user if backend fails
				if (authUser) {
					setUser(authUser);
					setEditData({
						name: authUser.name || '',
						profileImage: authUser.profileImage || '',
					});
				}
			} finally {
				setLoading(false);
			}
		};

		fetchUserProfile();
	}, [isAuthenticated, authUser]);

	const formatDate = (dateString) => {
		if (!dateString) return 'Not specified';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);

			// Create preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = async () => {
		try {
			// Create FormData for file upload
			const formData = new FormData();
			formData.append('name', editData.name);

			if (imageFile) {
				formData.append('profileImage', imageFile);
			}

			console.log('Saving profile changes:', editData);
			console.log('Image file:', imageFile);

			// Call backend API
			const response = await api.users.updateUserProfile(formData);

			if (response.message && response.user) {
				// Update local state with updated user data
				setUser(response.user);
				setEditData({
					name: response.user.name || '',
					profileImage: response.user.profileImage || '',
				});

				// Show success message
				if (showToast) {
					showToast(response.message, 'success');
				}

				// Clear editing state
				setIsEditing(false);
				setImageFile(null);
				setImagePreview('');
			}
		} catch (error) {
			console.error('Error saving profile:', error);
			if (showToast) {
				showToast('Failed to update profile. Please try again.', 'error');
			}
		}
	};

	const handleCancel = () => {
		setEditData({
			name: user?.name || '',
			profileImage: user?.profileImage || '',
		});
		setImageFile(null);
		setImagePreview('');
		setIsEditing(false);
	};
	useEffect(() => {
		if (user) {
			console.log('User profile loaded:', user);
		}
	}, [user]);

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
					{/* Edit Button */}
					<div className="flex justify-end mb-4">
						{!isEditing ? (
							<button
								onClick={() => setIsEditing(true)}
								className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">
								<Edit2 className="h-4 w-4" />
								<span>Edit Profile</span>
							</button>
						) : (
							<div className="flex space-x-2">
								<button
									onClick={handleSave}
									className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
									<Save className="h-4 w-4" />
									<span>Save</span>
								</button>
								<button
									onClick={handleCancel}
									className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
									<X className="h-4 w-4" />
									<span>Cancel</span>
								</button>
							</div>
						)}
					</div>

					{/* Profile Picture/Initials */}

					<div className="flex justify-center mb-6">
						<div className="relative">
							<div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center">
								<img
									src={
										imagePreview || user.profileImageUrl || user.profileImage
									}
									alt="profile-image"
									className="w-full h-full rounded-full object-cover"
								/>
							</div>
							{isEditing && (
								<div className="mt-2">
									<label className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 cursor-pointer">
										<Upload className="h-4 w-4 mr-2" />
										Upload New Image
										<input
											type="file"
											accept="image/*"
											onChange={handleImageChange}
											className="hidden"
										/>
									</label>
								</div>
							)}
						</div>
					</div>

					{/* Basic Info */}
					<div className="text-center mb-8">
						{isEditing ? (
							<div className="mb-4">
								<input
									type="text"
									value={editData.name}
									onChange={(e) =>
										setEditData({ ...editData, name: e.target.value })
									}
									className="text-2xl font-bold text-gray-900 text-center w-full border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none bg-transparent"
									placeholder="Enter your name"
								/>
							</div>
						) : (
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								{user.name || 'User'}
							</h2>
						)}
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
												{isEditing
													? editData.name || 'Not specified'
													: user.name || 'Not specified'}
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
