import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from './api';

const DesignPage = () => {
	const { category: urlCategory } = useParams();
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalProducts, setTotalProducts] = useState(0);
	const [savedDesigns, setSavedDesigns] = useState([]);
	const [selectedDesign, setSelectedDesign] = useState(null);

	const categoryName = urlCategory
		? decodeURIComponent(urlCategory)
		: 'All Categories';

	const applyFilters = useCallback(() => {
		let filtered = [...products];
		if (searchQuery) {
			filtered = filtered.filter(
				(product) =>
					product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.shortDescription
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			);
		}
		setFilteredProducts(filtered);
	}, [products, searchQuery]);

	// ✅ ENHANCED: Better category resolution with multiple fallback strategies
	const resolveCategory = (urlSlug, categoriesList) => {
		if (!urlSlug || urlSlug === 'all') return null;

		const decodedSlug = decodeURIComponent(urlSlug);
		console.log('🔍 Resolving slug:', decodedSlug);
		console.log(
			'🔍 Available categories:',
			categoriesList.map((cat) => ({ title: cat.title, slug: cat.slug }))
		);

		// Strategy 1: Exact slug match
		let category = categoriesList.find((cat) => cat.slug === decodedSlug);
		if (category) {
			console.log('✅ Found by exact slug match:', category.title);
			return category;
		}

		// Strategy 2: Slug without vendor suffix (for vendor categories)
		category = categoriesList.find(
			(cat) =>
				cat.slug &&
				cat.slug.split('-687277216c65341f9eaffe57')[0] === decodedSlug
		);
		if (category) {
			console.log('✅ Found by slug without vendor suffix:', category.title);
			return category;
		}

		// Strategy 3: Title to slug conversion match
		const slugFromTitle = decodedSlug.toLowerCase().replace(/-/g, ' ');
		category = categoriesList.find(
			(cat) => cat.title.toLowerCase() === slugFromTitle
		);
		if (category) {
			console.log('✅ Found by title conversion:', category.title);
			return category;
		}

		// Strategy 4: Partial title match
		category = categoriesList.find(
			(cat) =>
				cat.title.toLowerCase().includes(slugFromTitle) ||
				slugFromTitle.includes(cat.title.toLowerCase())
		);
		if (category) {
			console.log('✅ Found by partial match:', category.title);
			return category;
		}

		console.warn('❌ No category found for slug:', decodedSlug);
		return null;
	};

	const fetchInitialData = async (page = 1, limit = 50) => {
		try {
			setLoading(true);
			setError('');

			console.log('🔍 Starting data fetch for:', urlCategory);

			let categoryTitle = null;

			// Get all categories first
			const categoriesResponse = await api.categories.getAllCategories();
			let categoriesList = [];

			if (categoriesResponse.success && categoriesResponse.data) {
				categoriesList = categoriesResponse.data;
				setCategories(categoriesList);
				console.log('✅ Categories loaded:', categoriesList.length);
			}

			// ✅ ENHANCED: Better category resolution
			if (urlCategory && urlCategory !== 'all') {
				const foundCategory = resolveCategory(urlCategory, categoriesList);
				if (foundCategory) {
					categoryTitle = foundCategory.title;
					console.log('✅ Resolved category title:', categoryTitle);
				} else {
					// Last resort: use URL category directly
					categoryTitle = decodeURIComponent(urlCategory).replace(/-/g, ' ');
					console.log('⚠️ Using fallback category title:', categoryTitle);
				}
			}

			// Build filters
			const filters = { page, limit };
			if (categoryTitle) {
				filters.category = categoryTitle;
			}

			console.log('🔍 Fetching products with filters:', filters);

			// ✅ FIXED: Use the corrected API call
			const productsResponse = await api.products.getAllProducts(filters);

			console.log('🔍 Products API Response:', productsResponse);

			if (
				productsResponse.success &&
				Array.isArray(productsResponse.products)
			) {
				setProducts(productsResponse.products);
				setTotalPages(productsResponse.totalPages || 1);
				setTotalProducts(
					productsResponse.total || productsResponse.products.length
				);

				console.log('✅ Products loaded:', productsResponse.products.length);
				console.log(
					'📊 Product details:',
					productsResponse.products.map((p) => ({
						name: p.name,
						category: p.category,
					}))
				);
			} else {
				console.warn('⚠️ No products found or invalid response');
				setProducts([]);
				setTotalPages(1);
				setTotalProducts(0);
			}
		} catch (error) {
			console.error('❌ Failed to fetch data:', error);
			setError(`Failed to load products: ${error.message}`);
			setProducts([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setCurrentPage(1);
		fetchInitialData(1);
	}, [urlCategory]);

	useEffect(() => {
		if (currentPage !== 1) {
			fetchInitialData(currentPage);
		}
	}, [currentPage]);

	useEffect(() => {
		if (products.length > 0) {
			applyFilters();
		}
	}, [applyFilters]);

	// ✅ ENHANCED: Better image URL handling
	const getProductImage = (product) => {
		// Use imageUrl first (processed), then thumbnailImage, then fallback
		return (
			product.imageUrl || product.thumbnailImage || '/placeholder-image.jpg'
		);
	};

	const handleImageError = (e, productName) => {
		console.warn(`❌ Image failed for product: ${productName}`);
		e.target.src = '/placeholder-image.jpg';
	};

	const formatPrice = (priceRange) => {
		if (!priceRange || (!priceRange.min && !priceRange.max)) {
			return 'Price on Request';
		}
		const currency = priceRange.currency || 'INR';
		const symbol = currency === 'INR' ? '₹' : '$';
		if (priceRange.min && priceRange.max) {
			return `${symbol}${priceRange.min.toLocaleString()} - ${symbol}${priceRange.max.toLocaleString()}`;
		} else if (priceRange.min) {
			return `Starting ${symbol}${priceRange.min.toLocaleString()}`;
		} else {
			return 'Price on Request';
		}
	};

	const toggleSaveDesign = (id, event) => {
		event.stopPropagation();
		event.preventDefault();
		if (savedDesigns.includes(id)) {
			setSavedDesigns(savedDesigns.filter((designId) => designId !== id));
		} else {
			setSavedDesigns([...savedDesigns, id]);
		}
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading designs...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center p-8 bg-white rounded-lg shadow-lg">
					<div className="text-red-500 text-6xl mb-4">⚠️</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Oops! Something went wrong
					</h2>
					<p className="text-red-600 mb-6">{error}</p>
					<Button
						onClick={() => fetchInitialData(currentPage)}
						className="bg-red-600 hover:bg-red-700 text-white">
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-[1024px] bg-gray-50">
			<div className="max-w-[1440px] mx-auto px-8 py-12">
				{/* Header Section - Keep your existing header */}
				<div className="relative h-[400px] mb-16 rounded-2xl overflow-hidden">
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage: `url('https://readdy.ai/api/search-image?query=Panoramic%2520view%2520of%2520a%2520luxurious%2520modern%2520kitchen%2520with%2520island%2520and%2520high-end%2520appliances.%2520Features%2520elegant%2520cabinetry%252C%2520marble%2520countertops%252C%2520and%2520pendant%2520lighting.%2520The%2520left%2520side%2520has%2520a%2520dark%2520gradient%2520overlay%2520that%2520smoothly%2520blends%2520with%2520text%2520area%252C%2520while%2520the%2520right%2520side%2520shows%2520the%2520full%2520kitchen%2520with%2520natural%2520light%2520from%2520large%2520windows.&width=1400&height=400&seq=18&orientation=landscape')`,
						}}></div>
					<div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
					<div className="relative h-full flex items-center">
						<div className="text-white max-w-xl px-12">
							<h2 className="text-4xl font-bold mb-4 font-serif">
								Transform Your {categoryName}
							</h2>
							<p className="text-lg mb-6">
								Discover how our expert designers can help you create the
								perfect {categoryName.toLowerCase()} that combines style,
								functionality, and your personal taste.
							</p>
							<Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 !rounded-button cursor-pointer whitespace-nowrap">
								Get a Custom Design
							</Button>
						</div>
					</div>
				</div>

				{/* Debug Info Panel */}
				<div className="mb-8 p-4 bg-blue-50 rounded-lg">
					<h3 className="font-bold text-blue-800 mb-2">🔍 Debug Information</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
						<div>
							<strong>URL Category:</strong> {urlCategory || 'None'}
						</div>
						<div>
							<strong>Resolved Name:</strong> {categoryName}
						</div>
						<div>
							<strong>Total Products:</strong> {products.length}
						</div>
						<div>
							<strong>Filtered Products:</strong> {filteredProducts.length}
						</div>
					</div>
					{products.length > 0 && (
						<div className="mt-2">
							<strong>Sample Products:</strong>{' '}
							{products
								.slice(0, 3)
								.map((p) => p.name)
								.join(', ')}
						</div>
					)}
				</div>

				{/* Products Grid */}
				{filteredProducts.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
						{filteredProducts.map((product) => (
							<Link key={product._id} to={`/design-detail/${product._id}`}>
								<Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer">
									<div className="relative h-64 overflow-hidden">
										<img
											src={getProductImage(product)}
											alt={product.name}
											className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
											onError={(e) => handleImageError(e, product.name)}
										/>

										<div className="absolute top-4 right-4 z-10">
											<Button
												variant="outline"
												size="icon"
												className={`rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${
													savedDesigns.includes(product._id)
														? 'text-red-500'
														: 'text-gray-600'
												} !rounded-button cursor-pointer`}
												onClick={(e) => toggleSaveDesign(product._id, e)}>
												<i
													className={`${
														savedDesigns.includes(product._id) ? 'fas' : 'far'
													} fa-heart`}></i>
											</Button>
										</div>

										<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="flex justify-between items-center">
												<Badge className="bg-blue-600">
													{product.category}
												</Badge>
												<div className="flex items-center text-yellow-400">
													<i className="fas fa-star mr-1"></i>
													<span className="text-white text-sm">
														{product.rating || 4.5}
													</span>
												</div>
											</div>
										</div>
									</div>

									<div className="p-6">
										<div className="flex justify-between items-start mb-2">
											<h3 className="text-xl font-semibold text-gray-800">
												{product.name}
											</h3>
										</div>
										<p className="text-gray-600 text-sm mb-2">
											By {product.vendorName || 'Designer'}
										</p>
										<p className="text-gray-700 mb-4 line-clamp-2">
											{product.shortDescription}
										</p>
										<div className="flex justify-between items-center">
											<p className="font-medium text-blue-600">
												{formatPrice(product.priceRange)}
											</p>
											<Button
												variant="outline"
												className="text-blue-600 border-blue-600 hover:bg-blue-50 !rounded-button cursor-pointer whitespace-nowrap">
												Details <i className="fas fa-arrow-right ml-2"></i>
											</Button>
										</div>
									</div>
								</Card>
							</Link>
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<div className="text-gray-400 mb-4">
							<svg
								className="w-16 h-16 mx-auto"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							No designs found
						</h3>
						<p className="text-gray-600 mb-4">
							{searchQuery
								? `No designs match your search "${searchQuery}" in ${categoryName}`
								: `No designs available for ${categoryName} category`}
						</p>
						<Link to="/design-page/all">
							<Button>Browse All Designs</Button>
						</Link>
					</div>
				)}

				{/* Pagination - Keep your existing pagination */}
				{totalPages > 1 && (
					<div className="mt-12 flex justify-center">
						<div className="flex items-center space-x-2 bg-white p-2 rounded-xl shadow-lg">
							<Button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								variant="outline"
								className="rounded-lg">
								← Previous
							</Button>

							{[...Array(totalPages)].map((_, index) => {
								const page = index + 1;
								return (
									<Button
										key={page}
										onClick={() => handlePageChange(page)}
										variant={currentPage === page ? 'default' : 'outline'}
										className="rounded-lg min-w-[40px]">
										{page}
									</Button>
								);
							})}

							<Button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								variant="outline"
								className="rounded-lg">
								Next →
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DesignPage;
