// src/api.js

import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCwtyXKdHiKUqx8MWQkTsO4Y3pDIRQyWco',
	authDomain: 'interiordesign-ee9cf.firebaseapp.com',
	projectId: 'interiordesign-ee9cf',
	storageBucket: 'interiordesign-ee9cf.firebasestorage.app',
	messagingSenderId: '177990601301',
	appId: '1:177990601301:web:ecbe459a5031449eb8e2dc',
	measurementId: 'G-J4M8SENQHL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Provider with enhanced settings
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

// Backend API base URL
const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_BASE_URL =
	import.meta.env.VITE_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com';

// ====================== RATE LIMITING MANAGEMENT ======================

class RequestQueue {
	constructor() {
		this.queue = [];
		this.processing = false;
		this.requestCount = 0;
		this.lastRequestTime = 0;
		this.minDelay = 100; // Minimum delay between requests
		this.maxRequestsPerSecond = 10;
	}

	async addRequest(requestFn, priority = 0) {
		return new Promise((resolve, reject) => {
			this.queue.push({
				fn: requestFn,
				resolve,
				reject,
				priority,
				timestamp: Date.now(),
			});

			// Sort by priority (higher priority first)
			this.queue.sort((a, b) => b.priority - a.priority);

			if (!this.processing) {
				this.processQueue();
			}
		});
	}

	async processQueue() {
		if (this.processing || this.queue.length === 0) {
			return;
		}

		this.processing = true;

		while (this.queue.length > 0) {
			const request = this.queue.shift();
			const now = Date.now();

			// Rate limiting: ensure minimum delay between requests
			const timeSinceLastRequest = now - this.lastRequestTime;
			if (timeSinceLastRequest < this.minDelay) {
				await new Promise((resolve) =>
					setTimeout(resolve, this.minDelay - timeSinceLastRequest)
				);
			}

			try {
				const result = await request.fn();
				request.resolve(result);
				this.lastRequestTime = Date.now();
			} catch (error) {
				// Handle rate limiting specifically
				if (
					error.message.includes('Rate limited') ||
					error.message.includes('429')
				) {
					console.warn('Rate limited, re-queuing request...');
					// Re-queue with lower priority and delay
					this.queue.unshift({
						...request,
						priority: request.priority - 1,
					});
					// Wait longer before processing next request
					await new Promise((resolve) => setTimeout(resolve, 2000));
				} else {
					request.reject(error);
				}
			}
		}

		this.processing = false;
	}
}

const requestQueue = new RequestQueue();

// ====================== CLOUDINARY HELPERS ======================

export const getCloudinaryUrl = (publicId, options = {}) => {
	if (!publicId) return null;

	// If it's already a full URL, return as is
	if (publicId.startsWith('http')) {
		return publicId;
	}

	// If no cloud name configured, return placeholder
	if (!CLOUDINARY_CLOUD_NAME) {
		console.warn('Cloudinary cloud name not configured');
		return '/placeholder-image.jpg';
	}

	// Default transformations for optimization
	const defaultTransforms = 'w_800,h_600,c_fill,q_auto,f_auto';
	const customTransforms = options.transforms || defaultTransforms;

	return `${CLOUDINARY_BASE_URL}/${CLOUDINARY_CLOUD_NAME}/image/upload/${customTransforms}/${publicId}`;
};

// Process products to include proper image URLs
const processProductsWithImages = (products) => {
	if (!Array.isArray(products)) return [];

	return products.map((product) => ({
		...product,
		imageUrl: getCloudinaryUrl(product.thumbnailImage, {
			transforms: 'w_400,h_300,c_fill,q_auto,f_auto',
		}),
		galleryUrls:
			product.galleryImages?.map((img) =>
				getCloudinaryUrl(img, {
					transforms: 'w_400,h_300,c_fill,q_auto,f_auto',
				})
			) || [],
		originalThumbnail: product.thumbnailImage,
		originalGallery: product.galleryImages,
	}));
};

// Process vendors to include proper image URLs
const processVendorsWithImages = (vendors) => {
	if (!Array.isArray(vendors)) return [];

	return vendors.map((vendor) => ({
		...vendor,
		profileImageUrl: getCloudinaryUrl(vendor.images?.profileImage, {
			transforms: 'w_300,h_300,c_fill,q_auto,f_auto',
		}),
		coverImageUrl: getCloudinaryUrl(vendor.images?.coverImage, {
			transforms: 'w_800,h_400,c_fill,q_auto,f_auto',
		}),
		portfolioUrls:
			vendor.images?.portfolio?.map((img) =>
				getCloudinaryUrl(img, {
					transforms: 'w_400,h_300,c_fill,q_auto,f_auto',
				})
			) || [],
		originalImages: vendor.images,
	}));
};

// ====================== ENHANCED API REQUEST FUNCTION ======================

const apiRequest = async (
	endpoint,
	options = {},
	retryCount = 0,
	priority = 0
) => {
	const requestFn = async () => {
		const url = `${API_BASE_URL}${endpoint}`;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
			...options,
		};

		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		const response = await fetch(url, config);

		// Enhanced rate limiting handling
		if (response.status === 429) {
			const retryAfter = response.headers.get('Retry-After') || '5';
			const retryDelay = Math.min(parseInt(retryAfter) * 1000, 30000); // Max 30 seconds

			// Exponential backoff with max 3 retries
			if (retryCount < 3) {
				const backoffDelay = retryDelay * Math.pow(2, retryCount);
				console.warn(
					`Rate limited. Retrying after ${
						backoffDelay / 1000
					} seconds... (attempt ${retryCount + 1}/3)`
				);

				await new Promise((resolve) => setTimeout(resolve, backoffDelay));
				return apiRequest(endpoint, options, retryCount + 1, priority);
			} else {
				console.error('Max retry attempts reached for rate limiting');
				throw new Error(
					'Service temporarily unavailable. Please try again later.'
				);
			}
		}

		// Handle authentication errors
		if (response.status === 401) {
			console.error('Authentication failed - clearing invalid token');
			localStorage.removeItem('token');
			localStorage.removeItem('user');

			// Only redirect if we're not already on login page
			if (!window.location.pathname.includes('/login')) {
				window.location.href = '/login';
			}
			throw new Error('Session expired. Please log in again.');
		}

		if (response.status === 403) {
			throw new Error('Access denied. Insufficient permissions.');
		}

		if (response.status === 404) {
			throw new Error('Resource not found.');
		}

		if (response.status === 500) {
			console.error('Server error on endpoint:', endpoint);
			throw new Error('Server error. Please try again later.');
		}

		// Parse response
		let data;
		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			data = await response.json();
		} else {
			const text = await response.text();
			data = { message: text, success: false };
		}

		if (!response.ok) {
			throw new Error(
				data.message || `HTTP ${response.status}: ${response.statusText}`
			);
		}

		return data;
	};

	// Use request queue for rate limiting
	return requestQueue.addRequest(requestFn, priority);
};

// ====================== AUTHENTICATION API ======================
export const authAPI = {
	// Email/Password Registration
	register: async (userData) => {
		try {
			console.log('Starting email registration...');
			// Create user with Firebase
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			);
			const firebaseToken = await userCredential.user.getIdToken();

			// Register with backend
			const response = await apiRequest(
				'/auth/register',
				{
					method: 'POST',
					body: JSON.stringify({
						...userData,
						firebaseToken,
						role: 'user',
						authProvider: 'email',
					}),
				},
				0,
				5
			); // High priority

			if (response.success) {
				localStorage.setItem('token', response.token);
				localStorage.setItem('user', JSON.stringify(response.user));
			}

			return response;
		} catch (error) {
			console.error('Registration error:', error);
			throw error;
		}
	},

	// Email/Password Login
	login: async (credentials) => {
		try {
			console.log('Starting email login...');
			// Sign in with Firebase
			const userCredential = await signInWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password
			);
			const firebaseToken = await userCredential.user.getIdToken();

			// Login with backend
			const response = await apiRequest(
				'/auth/login',
				{
					method: 'POST',
					body: JSON.stringify({
						email: credentials.email,
						firebaseToken,
					}),
				},
				0,
				5
			); // High priority

			if (response.success) {
				localStorage.setItem('token', response.token);
				localStorage.setItem('user', JSON.stringify(response.user));
			}

			return response;
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	},

	// Google OAuth Registration
	registerWithGoogle: async () => {
		try {
			console.log('Starting Google registration...');
			const result = await signInWithPopup(auth, googleProvider);
			const firebaseToken = await result.user.getIdToken();

			// Register with backend
			const response = await apiRequest(
				'/auth/register',
				{
					method: 'POST',
					body: JSON.stringify({
						name: result.user.displayName || 'Google User',
						email: result.user.email,
						phone: null, // OAuth users don't provide phone numbers
						firebaseToken,
						role: 'user',
						authProvider: 'google',
					}),
				},
				0,
				5
			); // High priority

			if (response.success) {
				localStorage.setItem('token', response.token);
				localStorage.setItem('user', JSON.stringify(response.user));
			}

			return response;
		} catch (error) {
			console.error('Google registration error:', error);
			// If user already exists, try login instead
			if (error.message.includes('already exists')) {
				console.log('User exists, attempting login...');
				return await this.loginWithGoogle();
			}
			throw error;
		}
	},

	// Google OAuth Login
	loginWithGoogle: async () => {
		try {
			console.log('Starting Google login...');
			const result = await signInWithPopup(auth, googleProvider);
			const firebaseToken = await result.user.getIdToken();

			// Login with existing user
			const response = await apiRequest(
				'/auth/login',
				{
					method: 'POST',
					body: JSON.stringify({
						email: result.user.email,
						firebaseToken,
					}),
				},
				0,
				5
			); // High priority

			if (response.success) {
				localStorage.setItem('token', response.token);
				localStorage.setItem('user', JSON.stringify(response.user));
			}

			return response;
		} catch (error) {
			console.error('Google login error:', error);
			// If user not found, try registration instead
			if (
				error.message.includes('not found') ||
				error.message.includes('needsRegistration')
			) {
				console.log('User not found, attempting registration...');
				return await this.registerWithGoogle();
			}
			throw error;
		}
	},

	// Logout
	logout: async () => {
		try {
			await signOut(auth);
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		} catch (error) {
			console.error('Logout error:', error);
			throw error;
		}
	},

	// Get current user from localStorage
	getCurrentUser: () => {
		const user = localStorage.getItem('user');
		return user ? JSON.parse(user) : null;
	},

	// Check if user is authenticated
	isAuthenticated: () => {
		return !!localStorage.getItem('token');
	},
};

// ====================== CATEGORY API ======================

export const processImageUrl = (imageUrl, folder = 'categories') => {
	if (!imageUrl) return '/placeholder-image.jpg';

	// If it's already a full URL (Cloudinary or external), return as is
	if (imageUrl.startsWith('http')) {
		return imageUrl;
	}

	// If it's a Cloudinary public_id (contains folder structure)
	if (imageUrl.includes('/') && !imageUrl.startsWith('http')) {
		return `https://res.cloudinary.com/dbpjwgvst/image/upload/v1752261063/${imageUrl}.jpg`;
	}

	// If it's just a filename, assume it's in the specified folder
	return `https://res.cloudinary.com/dbpjwgvst/image/upload/v1752261063/${folder}/${imageUrl}.jpg`;
};
export const categoryAPI = {
	getAllCategories: async (type = null) => {
		try {
			let queryParam = type ? `?type=${type}` : '?includeAll=true';
			const response = await apiRequest(`/categories${queryParam}`, {}, 0, 2);

			if (response.success && response.data) {
				response.data = response.data.map((category) => ({
					...category,
					imageUrl: processImageUrl(category.imageUrl, 'categories'),

					originalImageUrl: category.imageUrl,
				}));
			}

			return response;
		} catch (error) {
			console.error('Get categories error:', error);
			throw error;
		}
	},
	getCategoryBySlug: async (slug) => {
		try {
			const response = await apiRequest(`/categories/slug/${slug}`, {}, 0, 3);
			return response;
		} catch (error) {
			console.error('Get category by slug error:', error);
			throw error;
		}
	},
	getCategoryById: async (id) => {
		try {
			const response = await apiRequest(`/categories/${id}`, {}, 0, 2);
			return response;
		} catch (error) {
			console.error('Get category error:', error);
			throw error;
		}
	},

	// Get category statistics
	getCategoryStats: async () => {
		try {
			const response = await apiRequest('/categories/stats', {}, 0, 1);
			return response;
		} catch (error) {
			console.error('Get category stats error:', error);
			throw error;
		}
	},
};

// ====================== PRODUCTS API ======================
export const productsAPI = {
	// Get all products with enhanced filtering
	getAllProducts: async (filters = {}) => {
		try {
			const queryParams = new URLSearchParams();

			if (
				filters.category &&
				filters.category !== 'all' &&
				filters.category !== 'All'
			) {
				queryParams.append('category', filters.category);
			}

			if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
			if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
			if (filters.vendor) queryParams.append('vendor', filters.vendor);
			if (filters.search) queryParams.append('search', filters.search);
			if (filters.page) queryParams.append('page', filters.page);
			if (filters.limit) queryParams.append('limit', filters.limit);

			const endpoint = `/products${
				queryParams.toString() ? '?' + queryParams.toString() : ''
			}`;

			console.log('🔍 API Request URL:', endpoint);
			console.log('🔍 Filters applied:', filters);

			const response = await apiRequest(endpoint, {}, 0, 2);

			console.log('🔍 Raw API Response:', response);

			// ✅ FIXED: Handle the correct data structure from backend
			if (response.success && response.data && response.data.products) {
				// Backend sends data.products, not just products
				return {
					success: true,
					products: response.data.products,
					total: response.data.total || response.data.products.length,
					totalPages: response.data.totalPages || 1,
					currentPage: response.data.currentPage || 1,
				};
			} else {
				console.error('❌ Invalid response structure:', response);
				return {
					success: false,
					products: [],
					total: 0,
					totalPages: 1,
					currentPage: 1,
				};
			}
		} catch (error) {
			console.error('Get products error:', error);
			throw error;
		}
	},

	getProductsByCategory: async (categoryTitle) => {
		try {
			if (
				!categoryTitle ||
				categoryTitle === 'all' ||
				categoryTitle === 'All'
			) {
				return await this.getAllProducts();
			}

			const response = await apiRequest(
				`/products?category=${encodeURIComponent(categoryTitle)}`,
				{},
				0,
				2
			);

			// ✅ FIXED: Handle correct response structure
			if (response.success && response.data && response.data.products) {
				return {
					success: true,
					products: response.data.products,
					total: response.data.total || response.data.products.length,
					totalPages: response.data.totalPages || 1,
					currentPage: response.data.currentPage || 1,
				};
			} else {
				return {
					success: false,
					products: [],
					total: 0,
					totalPages: 1,
					currentPage: 1,
				};
			}
		} catch (error) {
			console.error('Get products by category error:', error);
			throw error;
		}
	},

	getProductById: async (id) => {
		try {
			console.log('🔍 Fetching product by ID:', id);

			const response = await apiRequest(`/products/${id}`, {}, 0, 3);

			console.log('🔍 Product API Response:', response);

			// ✅ FIXED: Handle the correct response structure
			if (response.success && response.data && response.data.product) {
				return {
					success: true,
					product: response.data.product, // Access the nested product
				};
			} else {
				console.error('❌ Invalid product response format:', response);
				return {
					success: false,
					product: null,
					error: 'Product not found',
				};
			}
		} catch (error) {
			console.error('Get product error:', error);
			throw error;
		}
	},

	getFeaturedProducts: async (limit = 6) => {
		try {
			const response = await apiRequest(
				`/products?featured=true&limit=${limit}`,
				{},
				0,
				2
			);

			if (response.products && Array.isArray(response.products)) {
				response.products = processProductsWithImages(response.products);
			}

			return response;
		} catch (error) {
			console.error('Get featured products error:', error);
			throw error;
		}
	},
};

// ====================== VENDORS API ======================
export const vendorsAPI = {
	// Get all vendors with filtering
	getAllVendors: async (filters = {}) => {
		try {
			const queryParams = new URLSearchParams();
			// Add filter parameters
			if (filters.page) queryParams.append('page', filters.page);
			if (filters.limit) queryParams.append('limit', filters.limit);
			if (filters.category) queryParams.append('category', filters.category);
			if (filters.city) queryParams.append('city', filters.city);
			if (filters.state) queryParams.append('state', filters.state);
			if (filters.professionType)
				queryParams.append('professionType', filters.professionType);
			if (filters.budgetLevel)
				queryParams.append('budgetLevel', filters.budgetLevel);
			if (filters.rating) queryParams.append('rating', filters.rating);
			if (filters.search) queryParams.append('search', filters.search);

			const endpoint = `/vendors${
				queryParams.toString() ? '?' + queryParams.toString() : ''
			}`;

			const response = await apiRequest(endpoint, {}, 0, 2);

			// Process vendors to include proper image URLs
			if (response.data?.vendors && Array.isArray(response.data.vendors)) {
				response.data.vendors = processVendorsWithImages(response.data.vendors);
			}

			return response;
		} catch (error) {
			console.error('Get vendors error:', error);
			throw error;
		}
	},

	// Get single vendor by ID
	getVendorById: async (id) => {
		try {
			const response = await apiRequest(`/vendors/${id}`, {}, 0, 3);

			// Process single vendor to include proper image URLs
			if (response.data?.vendor) {
				const processedVendors = processVendorsWithImages([
					response.data.vendor,
				]);
				response.data.vendor = processedVendors[0];
			}

			return response;
		} catch (error) {
			console.error('Get vendor error:', error);
			throw error;
		}
	},

	// Get vendors by category
	getVendorsByCategory: async (category) => {
		try {
			const response = await apiRequest(
				`/vendors?category=${encodeURIComponent(category)}`,
				{},
				0,
				2
			);

			// Process vendors to include proper image URLs
			if (response.data?.vendors && Array.isArray(response.data.vendors)) {
				response.data.vendors = processVendorsWithImages(response.data.vendors);
			}

			return response;
		} catch (error) {
			console.error('Get vendors by category error:', error);
			throw error;
		}
	},

	// Get vendors by location
	getVendorsByLocation: async (city, state = null) => {
		try {
			const queryParams = new URLSearchParams();
			queryParams.append('city', city);
			if (state) queryParams.append('state', state);

			const response = await apiRequest(
				`/vendors?${queryParams.toString()}`,
				{},
				0,
				2
			);

			// Process vendors to include proper image URLs
			if (response.data?.vendors && Array.isArray(response.data.vendors)) {
				response.data.vendors = processVendorsWithImages(response.data.vendors);
			}

			return response;
		} catch (error) {
			console.error('Get vendors by location error:', error);
			throw error;
		}
	},

	// Get top-rated vendors
	getTopRatedVendors: async (limit = 6) => {
		try {
			const response = await apiRequest(
				`/vendors?rating=4&limit=${limit}`,
				{},
				0,
				2
			);

			// Process vendors to include proper image URLs
			if (response.data?.vendors && Array.isArray(response.data.vendors)) {
				response.data.vendors = processVendorsWithImages(response.data.vendors);
			}

			return response;
		} catch (error) {
			console.error('Get top-rated vendors error:', error);
			throw error;
		}
	},

	// Get vendor profile (authenticated)
	getVendorProfile: async () => {
		try {
			const response = await apiRequest('/vendors/profile', {}, 0, 3);
			// Process vendor profile to include proper image URLs
			if (response.data?.vendor) {
				const processedVendors = processVendorsWithImages([
					response.data.vendor,
				]);
				response.data.vendor = processedVendors[0];
			}

			return response;
		} catch (error) {
			console.error('Get vendor profile error:', error);
			throw error;
		}
	},

	// Update vendor profile (authenticated)
	updateVendorProfile: async (profileData) => {
		try {
			const response = await apiRequest(
				'/vendors/profile',
				{
					method: 'PUT',
					body: JSON.stringify(profileData),
				},
				0,
				3
			);
			return response;
		} catch (error) {
			console.error('Update vendor profile error:', error);
			throw error;
		}
	},

	// Get vendor dashboard stats (authenticated)
	getVendorDashboard: async () => {
		try {
			const response = await apiRequest('/vendors/dashboard/stats', {}, 0, 2);
			return response;
		} catch (error) {
			console.error('Get vendor dashboard error:', error);
			throw error;
		}
	},

	// Search vendors
	searchVendors: async (searchParams) => {
		try {
			const queryParams = new URLSearchParams();
			Object.entries(searchParams).forEach(([key, value]) => {
				if (value !== null && value !== undefined && value !== '') {
					queryParams.append(key, value);
				}
			});

			const response = await apiRequest(
				`/vendors?${queryParams.toString()}`,
				{},
				0,
				2
			);

			if (response.data?.vendors && Array.isArray(response.data.vendors)) {
				response.data.vendors = processVendorsWithImages(response.data.vendors);
			}

			return response;
		} catch (error) {
			console.error('Search vendors error:', error);
			throw error;
		}
	},
};

// ====================== MESSAGES API ======================
export const messagesAPI = {
	// Send message to vendor
	sendMessage: async (messageData) => {
		try {
			console.log('Sending message with data:', messageData);
			const response = await apiRequest(
				'/messages',
				{
					method: 'POST',
					body: JSON.stringify(messageData),
				},
				0,
				3
			);
			console.log('Message sent successfully:', response);
			return response;
		} catch (error) {
			console.error('Send message error details:', {
				error: error.message,
				status: error.status,
				data: messageData,
			});
			throw error;
		}
	},

	// Get user's sent messages
	getUserMessages: async (page = 1, limit = 10) => {
		try {
			const response = await apiRequest(
				`/messages/my-messages?page=${page}&limit=${limit}`,
				{},
				0,
				2
			);
			return response;
		} catch (error) {
			console.error('Get user messages error:', error);
			throw error;
		}
	},

	// Get vendor's received messages (for vendors)
	getVendorMessages: async (page = 1, limit = 10, status = null) => {
		try {
			const queryParams = new URLSearchParams();
			queryParams.append('page', page);
			queryParams.append('limit', limit);
			if (status) queryParams.append('status', status);

			const response = await apiRequest(
				`/messages/vendor/messages?${queryParams.toString()}`,
				{},
				0,
				3
			);
			return response;
		} catch (error) {
			console.error('Get vendor messages error:', error);
			throw error;
		}
	},

	// Mark message as read (for vendors)
	markMessageAsRead: async (messageId) => {
		try {
			const response = await apiRequest(
				`/messages/${messageId}/read`,
				{
					method: 'PATCH',
				},
				0,
				3
			);
			return response;
		} catch (error) {
			console.error('Mark message as read error:', error);
			throw error;
		}
	},

	// Get message statistics
	getMyMessageStats: async () => {
		try {
			const response = await apiRequest('/messages/vendor/stats', {}, 0, 1);
			return response;
		} catch (error) {
			console.error('Get message stats error:', error);
			throw error;
		}
	},

	// Get unread count
	getUnreadCount: async () => {
		try {
			const response = await apiRequest(
				'/messages/vendor/unread-count',
				{},
				0,
				3
			);
			return response;
		} catch (error) {
			console.error('Get unread count error:', error);
			throw error;
		}
	},

	// Reply to message
	replyToMessage: async (messageId, replyMessage) => {
		try {
			const response = await apiRequest(
				`/messages/${messageId}/reply`,
				{
					method: 'POST',
					body: JSON.stringify({ replyMessage }),
				},
				0,
				3
			);
			return response;
		} catch (error) {
			console.error('Reply to message error:', error);
			throw error;
		}
	},

	// Delete message
	deleteMessage: async (messageId) => {
		try {
			const response = await apiRequest(
				`/messages/${messageId}`,
				{
					method: 'DELETE',
				},
				0,
				2
			);
			return response;
		} catch (error) {
			console.error('Delete message error:', error);
			throw error;
		}
	},
};

// ====================== REVIEWS API ======================
export const reviewsAPI = {
	// Create new review
	createReview: async (reviewData, images = null) => {
		try {
			const formData = new FormData();
			// Add review data
			Object.keys(reviewData).forEach((key) => {
				formData.append(key, reviewData[key]);
			});

			// Add images if provided
			if (images && images.length > 0) {
				Array.from(images).forEach((image) => {
					formData.append('images', image);
				});
			}

			const response = await apiRequest(
				'/reviews',
				{
					method: 'POST',
					body: formData,
					headers: {}, // Remove Content-Type to let browser set it for FormData
				},
				0,
				3
			);
			return response;
		} catch (error) {
			console.error('Create review error:', error);
			throw error;
		}
	},

	// Get reviews for a vendor
	getVendorReviews: async (vendorId, page = 1, limit = 10) => {
		try {
			const response = await apiRequest(
				`/reviews/vendor/${vendorId}?page=${page}&limit=${limit}`,
				{},
				0,
				2
			);
			return response;
		} catch (error) {
			console.error('Get vendor reviews error:', error);
			throw error;
		}
	},

	// Get user's reviews
	getUserReviews: async () => {
		try {
			const response = await apiRequest('/reviews/my-reviews', {}, 0, 2);
			return response;
		} catch (error) {
			console.error('Get user reviews error:', error);
			throw error;
		}
	},

	// Update review
	updateReview: async (reviewId, reviewData, images = null) => {
		try {
			const formData = new FormData();
			// Add review data
			Object.keys(reviewData).forEach((key) => {
				formData.append(key, reviewData[key]);
			});

			// Add images if provided
			if (images && images.length > 0) {
				Array.from(images).forEach((image) => {
					formData.append('images', image);
				});
			}

			const response = await apiRequest(
				`/reviews/${reviewId}`,
				{
					method: 'PUT',
					body: formData,
					headers: {}, // Remove Content-Type to let browser set it for FormData
				},
				0,
				3
			);
			return response;
		} catch (error) {
			console.error('Update review error:', error);
			throw error;
		}
	},

	// Delete review
	deleteReview: async (reviewId) => {
		try {
			const response = await apiRequest(
				`/reviews/${reviewId}`,
				{
					method: 'DELETE',
				},
				0,
				2
			);
			return response;
		} catch (error) {
			console.error('Delete review error:', error);
			throw error;
		}
	},
};
// ====================== USER PROFILE API ======================
export const userAPI = {
	getUserProfile: async () => {
		try {
			const response = await apiRequest('/users/profile', {}, 0, 3);
			return response;
		} catch (error) {
			console.error('Get user profile error:', error);
			throw error;
		}
	},

	updateUserProfile: async (profileData) => {
		try {
			const response = await apiRequest(
				'/users/profile',
				{
					method: 'PUT',
					body: profileData,
					headers: {},
				},
				0,
				3
			);
			return response;
		} catch (error) {
			console.error('Update user profile error:', error);
			throw error;
		}
	},
};

// ====================== DEFAULT EXPORT ======================
export default {
	auth: authAPI,
	users: userAPI,
	categories: categoryAPI,
	products: productsAPI,
	vendors: vendorsAPI,
	messages: messagesAPI,
	reviews: reviewsAPI,
};
