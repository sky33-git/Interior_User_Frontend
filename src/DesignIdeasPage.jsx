import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter, Mail, MapPin, Phone, Search, Star, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from './api';
const DesignIdeas = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	// State management
	const [vendors, setVendors] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [categoriesLoading, setCategoriesLoading] = useState(false);
	const [totalResults, setTotalResults] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// Filter state
	const [filters, setFilters] = useState({
		category: '',
		city: '',
		state: '',
		professionType: searchParams.get('profession') || '',
		budgetLevel: '',
		rating: '',
		search: '',
		page: 1,
		limit: 12,
	});

	// ✅ Fetch dynamic categories on component mount
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setCategoriesLoading(true);
				const response = await api.categories.getAllCategories();
				if (response.success && response.data) {
					const filteredCategories = response.data.filter(
						(category) => category.categoryType === 'platform'
					);
					setCategories(filteredCategories);
				}
			} catch (error) {
				console.error('Failed to fetch categories:', error);
			} finally {
				setCategoriesLoading(false);
			}
		};

		fetchCategories();
	}, []);

	// ✅ Apply filters with debounce
	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			applyFilters();
		}, 300);

		return () => clearTimeout(debounceTimer);
	}, [filters]);
	const applyFilters = async () => {
		try {
			setLoading(true);
			console.log('🔍 Applying filters:', filters);

			const response = await api.vendors.getAllVendors(filters);

			if (response.success && response.data) {
				setVendors(response.data.vendors || []);
				setTotalResults(response.data.total || 0);
				setCurrentPage(response.data.currentPage || 1);
				setTotalPages(response.data.totalPages || 1);
				console.log('✅ Vendors loaded:', response.data.vendors?.length || 0);
			} else {
				setVendors([]);
				setTotalResults(0);
			}
		} catch (error) {
			console.error('Failed to filter vendors:', error);
			setVendors([]);
			setTotalResults(0);
		} finally {
			setLoading(false);
		}
	};

	// ✅ Filter change handler
	const handleFilterChange = (filterType, value) => {
		setFilters((prev) => ({
			...prev,
			[filterType]: value,
			page: 1, // Reset to first page when filters change
		}));
	};

	// ✅ Clear all filters
	const clearFilters = () => {
		setFilters({
			category: '',
			city: '',
			state: '',
			professionType: searchParams.get('profession') || '',
			budgetLevel: '',
			rating: '',
			search: '',
			page: 1,
			limit: 12,
		});
	};
	useEffect(() => {
		const professionFromUrl = searchParams.get('profession');
		if (professionFromUrl) {
			setFilters((prev) => ({
				...prev,
				professionType: professionFromUrl,
			}));
		}
	}, [searchParams]);

	// ✅ Pagination handler
	const handlePageChange = (newPage) => {
		setFilters((prev) => ({
			...prev,
			page: newPage,
		}));
	};

	// ✅ Helper function to render star ratings
	const renderStars = (rating) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;

		for (let i = 1; i <= 5; i++) {
			if (i <= fullStars) {
				stars.push(
					<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
				);
			} else if (i === fullStars + 1 && hasHalfStar) {
				stars.push(
					<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
				);
			} else {
				stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
			}
		}
		return stars;
	};

	// ✅ Get active filters count
	const getActiveFiltersCount = () => {
		return Object.values(filters).filter(
			(value) => value !== '' && value !== 1 && value !== 12
		).length;
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Find Professional Vendors
					</h1>
					<p className="text-gray-600">
						Discover and connect with verified interior design professionals
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* ✅ FILTERS SIDEBAR */}
					<div className="lg:col-span-1">
						<Card className="sticky top-6">
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Filter className="h-5 w-5" />
										Filters
										{getActiveFiltersCount() > 0 && (
											<Badge variant="secondary" className="ml-2">
												{getActiveFiltersCount()}
											</Badge>
										)}
									</div>
									{getActiveFiltersCount() > 0 && (
										<Button
											onClick={clearFilters}
											variant="ghost"
											size="sm"
											className="h-8 text-sm">
											<X className="h-4 w-4 mr-1" />
											Clear
										</Button>
									)}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* ✅ General Search */}
								<div className="space-y-2">
									<Label htmlFor="search">Search Vendors</Label>
									<div className="relative">
										<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="search"
											type="text"
											placeholder="Search by name, profession..."
											value={filters.search}
											onChange={(e) =>
												handleFilterChange('search', e.target.value)
											}
											className="pl-10"
										/>
									</div>
								</div>

								{/* ✅ Dynamic Categories Filter */}
								<div className="space-y-2">
									<Label htmlFor="category">Professional Categories</Label>
									<select
										id="category"
										value={filters.category}
										onChange={(e) =>
											handleFilterChange('category', e.target.value)
										}
										className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										disabled={categoriesLoading}>
										<option value="">All Categories</option>
										{categoriesLoading ? (
											<option disabled>Loading categories...</option>
										) : (
											categories.map((category) => (
												<option key={category._id} value={category.title}>
													{category.title}
												</option>
											))
										)}
									</select>
									{categoriesLoading && (
										<p className="text-xs text-gray-500">
											Loading categories...
										</p>
									)}
								</div>

								{/* ✅ Fixed Rating Filter */}
								{/* <div className="space-y-2">
									<Label htmlFor="rating">Minimum Rating</Label>
									<select
										id="rating"
										value={filters.rating}
										onChange={(e) =>
											handleFilterChange('rating', e.target.value)
										}
										className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
										<option value="">Any Rating</option>
										<option value="4.5">4.5 ⭐ & above</option>
										<option value="4.0">4.0 ⭐ & above</option>
										<option value="3.5">3.5 ⭐ & above</option>
										<option value="3.0">3.0 ⭐ & above</option>
										<option value="2.5">2.5 ⭐ & above</option>
										<option value="2.0">2.0 ⭐ & above</option>
									</select>
								</div> */}

								{/* ✅ Location Search */}
								<div className="space-y-2">
									<Label htmlFor="city">City</Label>
									<Input
										id="city"
										type="text"
										placeholder="Enter city name"
										value={filters.city}
										onChange={(e) => handleFilterChange('city', e.target.value)}
									/>
								</div>

								{/* <div className="space-y-2">
									<Label htmlFor="state">State</Label>
									<Input
										id="state"
										type="text"
										placeholder="Enter state name"
										value={filters.state}
										onChange={(e) =>
											handleFilterChange('state', e.target.value)
										}
									/>
								</div> */}

								{/* ✅ Profession Type Filter */}
								{/* <div className="space-y-2">
									<Label htmlFor="professionType">Profession Type</Label>
									<select
										id="professionType"
										value={filters.professionType}
										onChange={(e) =>
											handleFilterChange('professionType', e.target.value)
										}
										className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
										<option value="">All Professions</option>
										<option value="Interior Designer">Interior Designer</option>
										<option value="Architect">Architect</option>
										<option value="Contractor">Contractor</option>
										<option value="Decorator">Decorator</option>
										<option value="Consultant">Consultant</option>
										<option value="Furniture Designer">
											Furniture Designer
										</option>
										<option value="Lighting Designer">Lighting Designer</option>
									</select>
								</div> */}

								{/* ✅ Budget Level Filter */}
								{/* ✅ Budget Level Slider */}
								<div className="space-y-2">
									<Label htmlFor="budgetLevel">Budget Level</Label>
									<div className="space-y-3">
										<div className="relative">
											<input
												id="budgetLevel"
												type="range"
												min="0"
												max="3"
												step="1"
												value={
													filters.budgetLevel === 'Low'
														? 1
														: filters.budgetLevel === 'Medium'
														? 2
														: filters.budgetLevel === 'High'
														? 3
														: 0
												}
												onChange={(e) => {
													const value = parseInt(e.target.value);
													const budgetMapping = {
														0: '',
														1: 'Low',
														2: 'Medium',
														3: 'High',
													};
													handleFilterChange(
														'budgetLevel',
														budgetMapping[value]
													);
												}}
												className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
												style={{
													background: `linear-gradient(to right, 
						#3b82f6 0%, 
						#3b82f6 ${
							((filters.budgetLevel === 'Low'
								? 1
								: filters.budgetLevel === 'Medium'
								? 2
								: filters.budgetLevel === 'High'
								? 3
								: 0) /
								3) *
							100
						}%, 
						#e5e7eb ${
							((filters.budgetLevel === 'Low'
								? 1
								: filters.budgetLevel === 'Medium'
								? 2
								: filters.budgetLevel === 'High'
								? 3
								: 0) /
								3) *
							100
						}%, 
						#e5e7eb 100%)`,
												}}
											/>
											{/* Slider thumb styling */}
											<style jsx>{`
												.slider::-webkit-slider-thumb {
													appearance: none;
													height: 20px;
													width: 20px;
													border-radius: 50%;
													background: #3b82f6;
													cursor: pointer;
													border: 2px solid #ffffff;
													box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
												}
												.slider::-moz-range-thumb {
													height: 20px;
													width: 20px;
													border-radius: 50%;
													background: #3b82f6;
													cursor: pointer;
													border: 2px solid #ffffff;
													box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
												}
											`}</style>
										</div>

										<div className="flex justify-between text-xs text-gray-500">
											<span>Any Budget</span>
											<span>Low</span>
											<span>Medium</span>
											<span>High</span>
										</div>

										<div className="text-center">
											<Badge variant="outline" className="text-sm">
												{filters.budgetLevel === 'Low'
													? 'Low (₹10,000 - ₹50,000)'
													: filters.budgetLevel === 'Medium'
													? 'Medium (₹50,000 - ₹2,00,000)'
													: filters.budgetLevel === 'High'
													? 'High (₹2,00,000+)'
													: 'Any Budget'}
											</Badge>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* ✅ RESULTS SECTION */}
					<div className="lg:col-span-3">
						{/* Results Info */}
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-4">
								<p className="text-gray-600">
									{loading ? 'Loading...' : `Found ${totalResults} vendors`}
									{getActiveFiltersCount() > 0 && ' matching your criteria'}
								</p>
								{getActiveFiltersCount() > 0 && (
									<Button
										onClick={clearFilters}
										variant="outline"
										size="sm"
										className="h-8">
										Clear All Filters
									</Button>
								)}
							</div>
							<div className="text-sm text-gray-500">
								Page {currentPage} of {totalPages}
							</div>
						</div>

						{/* ✅ VENDOR GRID */}
						{/* ✅ VENDOR LIST */}
						{loading ? (
							<div className="space-y-4">
								{Array.from({ length: 6 }).map((_, index) => (
									<Card key={index} className="animate-pulse">
										<CardContent className="p-6">
											<div className="flex items-center space-x-4">
												<div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
												<div className="flex-1">
													<div className="h-4 bg-gray-300 rounded mb-2"></div>
													<div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
													<div className="h-3 bg-gray-300 rounded w-1/2"></div>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						) : vendors.length > 0 ? (
							<div className="space-y-4">
								{vendors.map((vendor) => (
									<Card
										key={vendor._id}
										className="hover:shadow-lg transition-shadow cursor-pointer"
										onClick={() => navigate(`/design-vendor/${vendor._id}`)}>
										<CardContent className="p-6">
											<div className="flex items-start space-x-6">
												<Avatar className="w-16 h-16 flex-shrink-0">
													<AvatarImage
														src={
															vendor.profileImageUrl ||
															vendor.images?.profileImage
														}
														alt={vendor.name}
													/>
													<AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
														{vendor.name ? vendor.name[0].toUpperCase() : 'V'}
													</AvatarFallback>
												</Avatar>
												{/* Main Content Section */}
												<div className="flex-1">
													<div className="flex items-start justify-between">
														<div className="flex-1">
															<h3 className="font-semibold text-lg text-gray-900">
																{vendor.name}
															</h3>
															<p className="text-gray-600 text-sm mb-2">
																{vendor.title || vendor.professionType}
															</p>
															{/* <div className="flex items-center gap-1 mb-3">
																{renderStars(vendor.rating || 0)}
																<span className="text-sm text-gray-500 ml-1">
																	({vendor.reviewCount || 0})
																</span>
															</div> */}
														</div>

														{/* Action Button */}
														<Button variant="outline" size="sm">
															View Profile
														</Button>
													</div>

													{/* Contact Info */}
													<div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
														<div className="flex items-center gap-1">
															<MapPin className="h-4 w-4" />
															{vendor.location?.city ||
																'Location not specified'}
															{vendor.location?.state &&
																`, ${vendor.location.state}`}
														</div>
														{vendor.phone && (
															<div className="flex items-center gap-1">
																<Phone className="h-4 w-4" />
																{vendor.phone}
															</div>
														)}
														{vendor.email && (
															<div className="flex items-center gap-1">
																<Mail className="h-4 w-4" />
																{vendor.email}
															</div>
														)}
													</div>

													{/* Categories and Badges */}
													<div className="flex items-center justify-between">
														<div className="flex flex-wrap gap-1">
															{vendor.categories &&
																vendor.categories.length > 0 && (
																	<>
																		{vendor.categories
																			.slice(0, 3)
																			.map((category, index) => (
																				<Badge
																					key={index}
																					variant="secondary"
																					className="text-xs">
																					{category}
																				</Badge>
																			))}
																		{vendor.categories.length > 3 && (
																			<Badge
																				variant="outline"
																				className="text-xs">
																				+{vendor.categories.length - 3} more
																			</Badge>
																		)}
																	</>
																)}
														</div>

														<div className="flex items-center gap-2">
															{vendor.isVerified && (
																<Badge
																	variant="default"
																	className="bg-green-100 text-green-800 text-xs">
																	Verified
																</Badge>
															)}
															{vendor.budgetLevel && (
																<Badge variant="outline" className="text-xs">
																	{vendor.budgetLevel}
																</Badge>
															)}
														</div>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<div className="text-gray-400 text-6xl mb-4">🔍</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									No vendors found
								</h3>
								<p className="text-gray-600 mb-4">
									No vendors match your current search criteria.
								</p>
								<Button onClick={clearFilters} variant="outline">
									Clear All Filters
								</Button>
							</div>
						)}

						{/* ✅ PAGINATION */}
						{!loading && vendors.length > 0 && totalPages > 1 && (
							<div className="flex items-center justify-center gap-2 mt-8">
								<Button
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
									variant="outline"
									size="sm">
									Previous
								</Button>

								{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
									const page = i + 1;
									return (
										<Button
											key={page}
											onClick={() => handlePageChange(page)}
											variant={currentPage === page ? 'default' : 'outline'}
											size="sm">
											{page}
										</Button>
									);
								})}

								<Button
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
									variant="outline"
									size="sm">
									Next
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DesignIdeas;
