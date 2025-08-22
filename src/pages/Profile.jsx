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
import api from '../api';
import { useAuth } from '../AuthContext';

const Profile = () => {
	const { user: authUser, isAuthenticated, showToast } = useAuth();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState({ name: '', profileImage: '' });
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState('');

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
			const reader = new FileReader();
			reader.onloadend = () => setImagePreview(reader.result);
			reader.readAsDataURL(file);
		}
	};

	const handleSave = async () => {
		try {
			const formData = new FormData();
			formData.append('name', editData.name);
			if (imageFile) formData.append('profileImage', imageFile);

			const response = await api.users.updateUserProfile(formData);
			if (response.message && response.user) {
				setUser(response.user);
				setEditData({
					name: response.user.name || '',
					profileImage: response.user.profileImage || '',
				});
				showToast && showToast(response.message, 'success');
				setIsEditing(false);
				setImageFile(null);
				setImagePreview('');
			}
		} catch (error) {
			console.error('Error saving profile:', error);
			showToast &&
				showToast('Failed to update profile. Please try again.', 'error');
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

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
			</div>
		);
	}

	if (!isAuthenticated || !user) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100">
				<div className="text-center">
					<UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
					<h2 className="text-2xl font-bold">Profile Not Found</h2>
					<p className="text-gray-600">Please log in to view your profile.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-10">
			<div className="max-w-4xl mx-auto relative">
				{/* Decorative Header */}
				<div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-2xl"></div>

				{/* Profile Card */}
				<div className="relative -mt-20 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8">
					{/* Profile Image */}
					<div className="flex flex-col items-center mb-6">
						<div className="relative group">
							<img
								src={imagePreview || user.profileImageUrl || user.profileImage}
								alt="profile"
								className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-md transition-transform group-hover:scale-105"
							/>
							{isEditing && (
								<label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 shadow-md">
									<Upload className="h-4 w-4" />
									<input
										type="file"
										accept="image/*"
										onChange={handleImageChange}
										className="hidden"
									/>
								</label>
							)}
						</div>
						{isEditing ? (
							<input
								type="text"
								value={editData.name}
								onChange={(e) =>
									setEditData({ ...editData, name: e.target.value })
								}
								className="mt-4 text-xl font-semibold text-center border-b border-gray-300 focus:border-indigo-500 outline-none bg-transparent"
								placeholder="Enter your name"
							/>
						) : (
							<h2 className="mt-4 text-2xl font-bold text-gray-900">
								{user.name}
							</h2>
						)}
						<p className="text-sm text-gray-500">
							Member since {formatDate(user.createdAt)}
						</p>
					</div>

					{/* Edit Buttons */}
					<div className="flex justify-end mb-6">
						{!isEditing ? (
							<button
								onClick={() => setIsEditing(true)}
								className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-full hover:bg-indigo-50 transition">
								<Edit2 className="h-4 w-4 mr-1" /> Edit Profile
							</button>
						) : (
							<div className="flex gap-2">
								<button
									onClick={handleSave}
									className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition">
									<Save className="h-4 w-4 mr-1" /> Save
								</button>
								<button
									onClick={handleCancel}
									className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition">
									<X className="h-4 w-4 mr-1" /> Cancel
								</button>
							</div>
						)}
					</div>

					{/* Info Sections */}
					<div className="grid sm:grid-cols-2 gap-6">
						<div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
							<h3 className="text-lg font-semibold mb-3">Personal Info</h3>
							<div className="space-y-3 text-sm">
								<div className="flex items-center gap-2">
									<UserIcon className="h-4 w-4 text-indigo-500" />
									<span>{user.name || 'Not specified'}</span>
								</div>
								<div className="flex items-center gap-2">
									<Mail className="h-4 w-4 text-indigo-500" />
									<span>{user.email || 'Not specified'}</span>
								</div>
								{user.phone && (
									<div className="flex items-center gap-2">
										<Phone className="h-4 w-4 text-indigo-500" />
										<span>{user.phone}</span>
									</div>
								)}
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
							<h3 className="text-lg font-semibold mb-3">Account Info</h3>
							<div className="space-y-3 text-sm">
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-indigo-500" />
									<span>{formatDate(user.createdAt)}</span>
								</div>
								{user.authProvider && (
									<div className="flex items-center gap-2">
										<UserIcon className="h-4 w-4 text-indigo-500" />
										<span className="capitalize">{user.authProvider}</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
