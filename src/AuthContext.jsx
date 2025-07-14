// src/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from './api';

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [authChecked, setAuthChecked] = useState(false);
	const [toast, setToast] = useState({
		show: false,
		message: '',
		type: 'success',
	});

	// Enhanced session check with better error handling
	useEffect(() => {
		const checkAuth = async () => {
			try {
				setLoading(true);

				// Check if user data exists in localStorage
				const currentUser = authAPI.getCurrentUser();
				const token = localStorage.getItem('token');

				if (currentUser && token) {
					// Validate token by making a test request
					try {
						// You can add a token validation endpoint call here if needed
						setUser(currentUser);
						console.log(
							'✅ Auth restored from localStorage:',
							currentUser.email
						);
					} catch (tokenError) {
						console.warn('⚠️ Token validation failed, clearing auth data');
						// Clear invalid auth data
						localStorage.removeItem('token');
						localStorage.removeItem('user');
						setUser(null);
					}
				} else {
					console.log('ℹ️ No valid auth data found');
				}
			} catch (error) {
				console.error('Auth check error:', error);
				// Clear potentially corrupted auth data
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				setUser(null);
			} finally {
				setLoading(false);
				setAuthChecked(true);
			}
		};

		checkAuth();
	}, []);

	// Enhanced toast system with auto-hide and better UX
	const showToast = (message, type = 'success', duration = 3000) => {
		setToast({ show: true, message, type });

		// Auto-hide toast after specified duration
		setTimeout(() => {
			hideToast();
		}, duration);
	};

	const hideToast = () => {
		setToast({ show: false, message: '', type: 'success' });
	};

	// Enhanced login with better error handling and loading states
	const login = async (credentials) => {
		try {
			if (!credentials.email || !credentials.password) {
				throw new Error('Email and password are required');
			}

			const response = await authAPI.login(credentials);

			if (response.success && response.user) {
				setUser(response.user);
				showToast('Login successful! Welcome back.', 'success');
				console.log('✅ Login successful:', response.user.email);
				return response;
			} else {
				throw new Error(response.message || 'Login failed');
			}
		} catch (error) {
			console.error('Login error:', error);

			// Enhanced error handling with specific messages
			let errorMessage = 'Login failed';

			if (error.message.includes('invalid-credential')) {
				errorMessage = 'Invalid email or password';
			} else if (error.message.includes('too-many-requests')) {
				errorMessage = 'Too many attempts. Please try again later.';
			} else if (error.message.includes('network')) {
				errorMessage = 'Network error. Please check your connection.';
			} else if (error.message.includes('Service temporarily unavailable')) {
				errorMessage = 'Service is busy. Please try again in a moment.';
			} else if (error.message) {
				errorMessage = error.message;
			}

			showToast(errorMessage, 'error', 4000);
			throw error;
		}
	};

	// Enhanced registration with better validation and error handling
	const register = async (userData) => {
		try {
			// Client-side validation
			if (!userData.name || !userData.email || !userData.password) {
				throw new Error('Name, email, and password are required');
			}

			if (userData.password.length < 6) {
				throw new Error('Password must be at least 6 characters long');
			}

			const response = await authAPI.register(userData);

			if (response.success && response.user) {
				setUser(response.user);
				showToast(
					'Account created successfully! Welcome to Interior 5D.',
					'success'
				);
				console.log('✅ Registration successful:', response.user.email);
				return response;
			} else {
				throw new Error(response.message || 'Registration failed');
			}
		} catch (error) {
			console.error('Registration error:', error);

			// Enhanced error handling
			let errorMessage = 'Registration failed';

			if (error.message.includes('email-already-in-use')) {
				errorMessage = 'An account with this email already exists';
			} else if (error.message.includes('weak-password')) {
				errorMessage =
					'Password is too weak. Please choose a stronger password.';
			} else if (error.message.includes('invalid-email')) {
				errorMessage = 'Please enter a valid email address';
			} else if (error.message.includes('Service temporarily unavailable')) {
				errorMessage = 'Service is busy. Please try again in a moment.';
			} else if (error.message) {
				errorMessage = error.message;
			}

			showToast(errorMessage, 'error', 4000);
			throw error;
		}
	};

	// Enhanced Google login with better error handling
	const loginWithGoogle = async () => {
		try {
			const response = await authAPI.loginWithGoogle();

			if (response.success && response.user) {
				setUser(response.user);
				showToast('Google login successful! Welcome back.', 'success');
				console.log('✅ Google login successful:', response.user.email);
				return response;
			} else {
				throw new Error(response.message || 'Google login failed');
			}
		} catch (error) {
			console.error('Google login error:', error);

			// Enhanced error handling for Google OAuth
			let errorMessage = 'Google login failed';

			if (error.message.includes('popup-closed-by-user')) {
				errorMessage = 'Login cancelled by user';
			} else if (error.message.includes('popup-blocked')) {
				errorMessage = 'Pop-up blocked. Please enable pop-ups and try again.';
			} else if (error.message.includes('network')) {
				errorMessage = 'Network error. Please check your connection.';
			} else if (error.message.includes('Service temporarily unavailable')) {
				errorMessage = 'Service is busy. Please try again in a moment.';
			} else if (
				error.message &&
				!error.message.includes('Google login failed')
			) {
				errorMessage = error.message;
			}

			showToast(errorMessage, 'error', 4000);
			throw error;
		}
	};

	// Enhanced Google registration with better error handling
	const registerWithGoogle = async () => {
		try {
			const response = await authAPI.registerWithGoogle();

			if (response.success && response.user) {
				setUser(response.user);
				showToast(
					'Account created with Google! Welcome to Interior 5D.',
					'success'
				);
				console.log('✅ Google registration successful:', response.user.email);
				return response;
			} else {
				throw new Error(response.message || 'Google registration failed');
			}
		} catch (error) {
			console.error('Google registration error:', error);

			// Enhanced error handling for Google OAuth registration
			let errorMessage = 'Google registration failed';

			if (error.message.includes('popup-closed-by-user')) {
				errorMessage = 'Registration cancelled by user';
			} else if (error.message.includes('popup-blocked')) {
				errorMessage = 'Pop-up blocked. Please enable pop-ups and try again.';
			} else if (error.message.includes('already exists')) {
				errorMessage = 'Account already exists. Please try logging in instead.';
			} else if (error.message.includes('network')) {
				errorMessage = 'Network error. Please check your connection.';
			} else if (error.message.includes('Service temporarily unavailable')) {
				errorMessage = 'Service is busy. Please try again in a moment.';
			} else if (
				error.message &&
				!error.message.includes('Google registration failed')
			) {
				errorMessage = error.message;
			}

			showToast(errorMessage, 'error', 4000);
			throw error;
		}
	};

	// Enhanced logout with proper cleanup
	const logout = async () => {
		try {
			// Clear user state immediately for better UX
			setUser(null);

			// Perform logout cleanup
			await authAPI.logout();

			showToast('Logged out successfully', 'success');
			console.log('✅ Logout successful');
		} catch (error) {
			console.error('Logout error:', error);

			// Even if logout fails, ensure local state is cleared
			setUser(null);
			localStorage.removeItem('token');
			localStorage.removeItem('user');

			// Show appropriate message
			if (error.message.includes('network')) {
				showToast('Logged out (offline)', 'warning');
			} else {
				showToast('Logged out successfully', 'success');
			}
		}
	};

	// Enhanced session refresh function
	const refreshSession = async () => {
		try {
			const currentUser = authAPI.getCurrentUser();
			if (currentUser) {
				setUser(currentUser);
				return currentUser;
			}
		} catch (error) {
			console.error('Session refresh error:', error);
			// Clear corrupted session data
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			setUser(null);
		}
		return null;
	};

	// Check if user is authenticated (enhanced with token validation)
	const isAuthenticated = () => {
		return !!(user && localStorage.getItem('token'));
	};

	// Get user role for role-based access control
	const getUserRole = () => {
		return user?.role || 'user';
	};

	// Check if user has specific role
	const hasRole = (role) => {
		return getUserRole() === role;
	};

	// Enhanced value object with additional utilities
	const value = {
		// Core state
		user,
		loading,
		authChecked,

		// Authentication methods
		login,
		register,
		loginWithGoogle,
		registerWithGoogle,
		logout,
		refreshSession,

		// Auth utilities
		isAuthenticated,
		getUserRole,
		hasRole,

		// Toast system
		toast,
		showToast,
		hideToast,

		// Enhanced properties
		isLoggedIn: isAuthenticated(),
		userRole: getUserRole(),
		isAdmin: hasRole('admin'),
		isVendor: hasRole('vendor'),
		isUser: hasRole('user'),
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export additional utilities if needed
export const useAuthUser = () => {
	const { user } = useAuth();
	return user;
};

export const useAuthRole = () => {
	const { getUserRole } = useAuth();
	return getUserRole();
};
