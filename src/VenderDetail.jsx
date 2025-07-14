import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from './api';

const VenderDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// Backend integration states
	const [vendor, setVendor] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Reviews states
	const [reviews, setReviews] = useState([]);
	const [reviewsLoading, setReviewsLoading] = useState(false);
	const [reviewsPage, setReviewsPage] = useState(1);
	const [totalReviews, setTotalReviews] = useState(0);

	// Modal states
	const [messageModal, setMessageModal] = useState(false);
	const [reviewModal, setReviewModal] = useState(false);

	// Message form states
	const [messageData, setMessageData] = useState({
		message: '',
		phone: '',
		pincode: '',
	});
	const [messageSending, setMessageSending] = useState(false);

	// Review form states
	const [reviewData, setReviewData] = useState({
		rating: 0,
		reviewText: '',
	});
	const [reviewImages, setReviewImages] = useState(null);
	const [reviewSubmitting, setReviewSubmitting] = useState(false);

	const sections = [
		{ id: 'about', label: 'About Us' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'business', label: 'Business' },
		{ id: 'credentials', label: 'Credentials' },
		{ id: 'reviews', label: 'Reviews' },
		{ id: 'ideabooks', label: 'Ideabooks' },
	];

	const [activeSection, setActiveSection] = useState('about');

	// ✅ FIXED: Helper function to get profile image URL
	const getProfileImageUrl = (profileImage) => {
		if (!profileImage) return null;
		if (profileImage.startsWith('http')) return profileImage;
		return `https://res.cloudinary.com/dbpjwgvst/image/upload/c_fill,f_auto,h_400,q_auto,w_400/v1/${profileImage}`;
	};

	// Fetch vendor data from backend
	useEffect(() => {
		const fetchVendorDetails = async () => {
			try {
				setLoading(true);
				setError('');
				const response = await api.vendors.getVendorById(id);
				if (response.success && response.data?.vendor) {
					setVendor(response.data.vendor);
				} else {
					setError('Vendor not found');
				}
			} catch (error) {
				console.error('Failed to fetch vendor details:', error);
				setError('Failed to load vendor details');
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchVendorDetails();
		} else {
			setError('No vendor ID provided');
			setLoading(false);
		}
	}, [id]);

	// Fetch reviews separately
	useEffect(() => {
		const fetchReviews = async () => {
			if (!id) return;

			try {
				setReviewsLoading(true);
				const response = await api.reviews.getVendorReviews(
					id,
					reviewsPage,
					10
				);
				if (reviewsPage === 1) {
					setReviews(response.reviews || []);
				} else {
					setReviews((prev) => [...prev, ...(response.reviews || [])]);
				}
				setTotalReviews(response.total || 0);
			} catch (error) {
				console.error('Failed to fetch reviews:', error);
			} finally {
				setReviewsLoading(false);
			}
		};

		fetchReviews();
	}, [id, reviewsPage]);

	// Handle scroll to highlight active section
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 150;
			let currentSection = 'about';

			for (const section of sections) {
				const el = document.getElementById(section.id);
				if (el && el.offsetTop <= scrollPosition) {
					currentSection = section.id;
				}
			}

			setActiveSection(currentSection);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Smooth scroll to section on tab click
	const scrollToSection = (id) => {
		const el = document.getElementById(id);
		if (el) {
			window.scrollTo({
				top: el.offsetTop - 100,
				behavior: 'smooth',
			});
		}
	};

	// Handle message sending
	const handleSendMessage = async () => {
		if (!api.auth.isAuthenticated()) {
			alert('Please login to send a message');
			navigate('/login');
			return;
		}

		if (!messageData.message.trim()) {
			alert('Please enter a message before sending');
			return;
		}

		try {
			setMessageSending(true);
			const user = api.auth.getCurrentUser();

			if (!user || !user.email) {
				throw new Error('User information incomplete. Please login again.');
			}

			const payload = {
				vendorId: id,
				message: messageData.message.trim(),
				name: user.name || user.firstName || 'User',
				email: user.email,
				phone: messageData.phone || user.phone || '',
				pincode:
					messageData.pincode || user.pincode || user.location?.pincode || '',
			};

			const response = await api.messages.sendMessage(payload);

			setMessageData({ message: '', phone: '', pincode: '' });
			setMessageModal(false);
			alert('Message sent successfully!');
		} catch (error) {
			console.error('Message sending failed:', error);
			alert(`Failed to send message: ${error.message}`);
		} finally {
			setMessageSending(false);
		}
	};

	// Handle review submission
	const handleWriteReview = async () => {
		if (!api.auth.isAuthenticated()) {
			alert('Please login to write a review');
			navigate('/login');
			return;
		}

		if (reviewData.rating === 0) {
			alert('Please select a rating before submitting your review');
			return;
		}

		if (!reviewData.reviewText.trim()) {
			alert('Please write a review before submitting');
			return;
		}

		try {
			setReviewSubmitting(true);
			const payload = {
				vendorId: id,
				rating: reviewData.rating,
				reviewText: reviewData.reviewText,
			};

			await api.reviews.createReview(payload, reviewImages);

			setReviewData({ rating: 0, reviewText: '' });
			setReviewImages(null);
			setReviewModal(false);
			setReviewsPage(1);
			alert('Review submitted successfully!');
		} catch (error) {
			console.error('Failed to submit review:', error);
			alert('Failed to submit review. Please try again.');
		} finally {
			setReviewSubmitting(false);
		}
	};

	// Load more reviews
	const loadMoreReviews = () => {
		setReviewsPage((prev) => prev + 1);
	};

	// Helper function to render star ratings
	const renderStars = (rating) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;

		for (let i = 1; i <= 5; i++) {
			if (i <= fullStars) {
				stars.push(
					<span key={i} className="text-yellow-400">
						★
					</span>
				);
			} else if (i === fullStars + 1 && hasHalfStar) {
				stars.push(
					<span key={i} className="text-yellow-400">
						★
					</span>
				);
			} else {
				stars.push(
					<span key={i} className="text-gray-300">
						★
					</span>
				);
			}
		}
		return stars;
	};

	// Interactive star rating for reviews
	const renderInteractiveStars = (rating, onRatingChange) => {
		const ratings = [
			{ value: 1, label: 'Poor', emoji: '😞' },
			{ value: 2, label: 'Fair', emoji: '😐' },
			{ value: 3, label: 'Good', emoji: '🙂' },
			{ value: 4, label: 'Very Good', emoji: '😊' },
			{ value: 5, label: 'Excellent', emoji: '🤩' },
		];

		return (
			<div className="space-y-3">
				<div className="flex space-x-1">
					{[1, 2, 3, 4, 5].map((star) => (
						<button
							key={star}
							type="button"
							onClick={() => onRatingChange(star)}
							className={`text-2xl transition-colors ${
								star <= rating ? 'text-yellow-400' : 'text-gray-300'
							}`}>
							★
						</button>
					))}
				</div>
				{rating > 0 && (
					<div className="flex items-center space-x-2 text-sm">
						<span>{ratings[rating - 1]?.emoji}</span>
						<span className="font-medium text-gray-700">
							{ratings[rating - 1]?.label}
						</span>
					</div>
				)}
			</div>
		);
	};

	// Format address helper
	const formatAddress = (location) => {
		if (!location) return 'Location not specified';
		const parts = [
			location.area,
			location.city,
			location.state,
			location.pincode,
		].filter(Boolean);
		return parts.length > 0 ? parts.join(', ') : 'Location not specified';
	};

	// Loading state
	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading vendor details...</p>
				</div>
			</div>
		);
	}

	// Error state
	if (error || !vendor) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="text-red-500 text-6xl mb-4">⚠️</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Vendor Not Found
					</h2>
					<p className="text-gray-600 mb-4">
						The vendor you're looking for doesn't exist or has been removed.
					</p>
					<Button
						onClick={() => navigate('/')}
						className="bg-blue-600 hover:bg-blue-700">
						Back to Home
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* ✅ REVERTED: Simple Hero Section with Template Cover */}
				<div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
					{/* ✅ FIXED: Simple template cover image instead of colorful gradient */}
					<div className="relative h-48 bg-gray-100">
						<img
							src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
							alt="Cover"
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-10"></div>
					</div>

					<div className="relative px-6 pb-6">
						<div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
							{/* ✅ FIXED: Profile image with proper URL handling */}
							<div className="relative -mt-16 mb-4 sm:mb-0 flex justify-center sm:justify-start">
								<Avatar className="w-32 h-32 border-4 border-white shadow-lg">
									<AvatarImage
										src={getProfileImageUrl(vendor.profileImage)}
										alt={vendor.name}
										className="object-cover"
									/>
									<AvatarFallback className="bg-blue-500 text-white text-3xl font-bold">
										{vendor.name ? vendor.name[0].toUpperCase() : 'V'}
									</AvatarFallback>
								</Avatar>
							</div>

							<div className="flex-1 text-center sm:text-left">
								<h1 className="text-3xl font-bold text-gray-900 mb-2">
									{vendor.name}
								</h1>
								<p className="text-lg text-gray-600 mb-4">
									{vendor.title ||
										vendor.professionType ||
										'Professional Service Provider'}
								</p>

								<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
									<div className="flex items-center justify-center sm:justify-start">
										<div className="flex items-center space-x-1">
											{renderStars(vendor.rating || 4.5)}
											<span className="text-sm text-gray-600 ml-2">
												({vendor.reviewCount || totalReviews} reviews)
											</span>
										</div>
									</div>

									<div className="flex space-x-3 justify-center sm:justify-start">
										<Button
											onClick={() => setMessageModal(true)}
											className="bg-blue-600 hover:bg-blue-700">
											Send Message
										</Button>
										<Button
											onClick={() => setReviewModal(true)}
											variant="outline">
											Write Review
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="bg-white rounded-lg shadow-sm mb-6 sticky top-16 z-40">
					<Tabs value={activeSection} onValueChange={setActiveSection}>
						<TabsList className="w-full justify-start overflow-x-auto">
							{sections.map((section) => (
								<TabsTrigger
									key={section.id}
									value={section.id}
									onClick={() => scrollToSection(section.id)}
									className="whitespace-nowrap">
									{section.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>

				{/* Content Sections */}
				<div className="space-y-8">
					{/* About Section */}
					<section id="about" className="bg-white rounded-lg shadow-sm p-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
						<p className="text-gray-700 leading-relaxed">
							{vendor.about ||
								`${vendor.name} is a professional ${
									vendor.professionType || 'service provider'
								} dedicated to delivering quality services.`}
						</p>

						{vendor.categories && vendor.categories.length > 0 && (
							<div className="mt-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									Specializations
								</h3>
								<div className="flex flex-wrap gap-2">
									{vendor.categories.map((category, index) => (
										<span
											key={index}
											className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
											{category}
										</span>
									))}
								</div>
							</div>
						)}

						<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									Contact Information
								</h3>
								<div className="space-y-2 text-sm">
									<p className="text-gray-600">
										📍 {formatAddress(vendor.location)}
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* Projects Section */}
					<section id="projects" className="bg-white rounded-lg shadow-sm p-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
						{vendor.portfolioImages && vendor.portfolioImages.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{vendor.portfolioImages.map((image, index) => (
									<div
										key={index}
										className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
										<img
											src={getProfileImageUrl(image)}
											alt={`Project ${index + 1}`}
											className="w-full h-full object-cover hover:scale-105 transition-transform"
										/>
									</div>
								))}
							</div>
						) : (
							<p className="text-gray-500 text-center py-8">
								No portfolio images available
							</p>
						)}
					</section>

					{/* Business Section */}
					<section id="business" className="bg-white rounded-lg shadow-sm p-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">Business</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-3">
								<p className="text-sm">
									<span className="font-medium text-gray-700">Phone:</span>{' '}
									<span className="text-gray-600">
										{vendor.phone || 'Not provided'}
									</span>
								</p>
								<p className="text-sm">
									<span className="font-medium text-gray-700">Email:</span>{' '}
									<span className="text-gray-600">
										{vendor.email || 'Not provided'}
									</span>
								</p>
								{vendor.professionType && (
									<p className="text-sm">
										<span className="font-medium text-gray-700">
											Profession:
										</span>{' '}
										<span className="text-gray-600">
											{vendor.professionType}
										</span>
									</p>
								)}
							</div>

							<div className="space-y-3">
								<p className="text-sm">
									<span className="font-medium text-gray-700">
										Service Areas:
									</span>{' '}
									<span className="text-gray-600">
										{vendor.serviceAreas?.length > 0
											? vendor.serviceAreas.join(', ')
											: 'All types of projects'}
									</span>
								</p>
							</div>
						</div>
					</section>

					{/* Credentials Section */}
					<section
						id="credentials"
						className="bg-white rounded-lg shadow-sm p-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							Credentials
						</h2>
						<div className="space-y-4">
							{vendor.license && (
								<div className="flex items-center space-x-2">
									<span className="w-2 h-2 bg-green-500 rounded-full"></span>
									<span className="text-sm text-gray-700">
										License: {vendor.license}
									</span>
								</div>
							)}
							{vendor.isVerified && (
								<div className="flex items-center space-x-2">
									<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
									<span className="text-sm text-gray-700">
										Verified Professional
									</span>
								</div>
							)}
						</div>
					</section>

					{/* Reviews Section */}
					<section id="reviews" className="bg-white rounded-lg shadow-sm p-6">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
							<Button
								onClick={() => setReviewModal(true)}
								variant="outline"
								size="sm">
								Write Review
							</Button>
						</div>

						{reviews.length > 0 ? (
							<div className="space-y-6">
								<div className="space-y-4">
									{reviews.map((review) => (
										<div
											key={review._id}
											className="border-b border-gray-200 pb-4">
											<div className="flex items-start space-x-3">
												<Avatar className="w-10 h-10">
													<AvatarImage
														src={getProfileImageUrl(
															review.userId?.profileImage
														)}
														alt={review.userId?.name || 'User'}
													/>
													<AvatarFallback className="bg-gray-200 text-gray-700">
														{review.userId?.name
															? review.userId.name[0].toUpperCase()
															: 'U'}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="flex items-center justify-between">
														<p className="text-sm font-medium text-gray-900">
															{review.userId?.name || 'Anonymous User'}
														</p>
														<div className="flex items-center space-x-1">
															{renderStars(review.rating || 5)}
														</div>
													</div>
													<p className="text-xs text-gray-500 mb-2">
														{new Date(review.createdAt).toLocaleDateString()}
													</p>
													<p className="text-sm text-gray-700">
														{review.reviewText || 'Great service!'}
													</p>
													{review.images && review.images.length > 0 && (
														<div className="flex space-x-2 mt-3">
															{review.images.slice(0, 3).map((image, idx) => (
																<img
																	key={idx}
																	src={getProfileImageUrl(image)}
																	alt={`Review ${idx + 1}`}
																	className="w-16 h-16 object-cover rounded"
																/>
															))}
														</div>
													)}
												</div>
											</div>
										</div>
									))}
								</div>

								{reviews.length < totalReviews && (
									<div className="text-center">
										<Button
											onClick={loadMoreReviews}
											variant="outline"
											disabled={reviewsLoading}>
											{reviewsLoading ? 'Loading...' : 'Load More Reviews'}
										</Button>
									</div>
								)}
							</div>
						) : (
							<div className="text-center py-8">
								<p className="text-gray-500 mb-4">No reviews yet</p>
								<Button onClick={() => setReviewModal(true)} variant="outline">
									Be the first to review
								</Button>
							</div>
						)}
					</section>

					{/* Ideabooks Section */}
					<section id="ideabooks" className="bg-white rounded-lg shadow-sm p-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							Inspiration from {vendor.name}
						</h2>
						<p className="text-gray-500 text-center py-8">
							No ideabooks available
						</p>
					</section>
				</div>
			</div>

			{/* Message Modal */}
			<Dialog open={messageModal} onOpenChange={setMessageModal}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Send Message to {vendor.name}</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<Label htmlFor="message">Message</Label>
							<Textarea
								id="message"
								placeholder="Tell them about your project..."
								value={messageData.message}
								onChange={(e) =>
									setMessageData({ ...messageData, message: e.target.value })
								}
								className="min-h-[100px]"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="phone">Phone</Label>
								<Input
									id="phone"
									type="tel"
									placeholder="Your phone number"
									value={messageData.phone}
									onChange={(e) =>
										setMessageData({ ...messageData, phone: e.target.value })
									}
								/>
							</div>
							<div>
								<Label htmlFor="pincode">Pincode</Label>
								<Input
									id="pincode"
									placeholder="Your pincode"
									value={messageData.pincode}
									onChange={(e) =>
										setMessageData({ ...messageData, pincode: e.target.value })
									}
								/>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setMessageModal(false)}>
							Cancel
						</Button>
						<Button
							type="button"
							onClick={handleSendMessage}
							disabled={messageSending || !messageData.message.trim()}>
							{messageSending ? 'Sending...' : 'Send Message'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Review Modal */}
			<Dialog open={reviewModal} onOpenChange={setReviewModal}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Write a Review for {vendor.name}</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<Label>Rating</Label>
							{renderInteractiveStars(reviewData.rating, (rating) =>
								setReviewData({ ...reviewData, rating })
							)}
						</div>
						<div>
							<Label htmlFor="reviewText">Review</Label>
							<Textarea
								id="reviewText"
								placeholder="Share your experience..."
								value={reviewData.reviewText}
								onChange={(e) =>
									setReviewData({ ...reviewData, reviewText: e.target.value })
								}
								className="min-h-[100px]"
							/>
						</div>
						<div>
							<Label htmlFor="reviewImages">Images (optional)</Label>
							<Input
								id="reviewImages"
								type="file"
								multiple
								accept="image/*"
								onChange={(e) => setReviewImages(e.target.files)}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setReviewModal(false)}>
							Cancel
						</Button>
						<Button
							type="button"
							onClick={handleWriteReview}
							disabled={
								reviewSubmitting ||
								reviewData.rating === 0 ||
								!reviewData.reviewText.trim()
							}>
							{reviewSubmitting ? 'Submitting...' : 'Submit Review'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default VenderDetail;
