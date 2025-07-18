import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categoryAPI } from './api';

const FindPros = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState('All');
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
			setLoading(true);
			setError('');

			const response = await categoryAPI.getAllCategories();

			if (response.success && response.data) {
				const transformedCategories = response.data.map((category) => ({
					_id: category._id,
					title: category.title,
					designs: category.designs || 0,
					imageUrl: category.imageUrl, // Already processed by API
					slug: category.slug,
					description: category.description,
					categoryType: category.categoryType,
				}));

				setCategories(transformedCategories);
			} else {
				setError('Failed to load categories');
			}
		} catch (error) {
			console.error('Failed to fetch categories:', error);
			setError('Failed to load categories. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleImageError = (e, categoryTitle) => {
		console.warn(`Image failed for category: ${categoryTitle}`);
		// Try multiple fallback approaches
		const fallbackUrls = [
			'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg',
			'https://via.placeholder.com/400x300/e2e8f0/64748b?text=' +
				encodeURIComponent(categoryTitle),
			'/placeholder-image.jpg',
		];

		const currentSrc = e.target.src;
		const currentIndex =
			fallbackUrls.findIndex((url) => currentSrc.includes(url)) || -1;

		if (currentIndex < fallbackUrls.length - 1) {
			e.target.src = fallbackUrls[currentIndex + 1];
		}
	};
	const createCategorySlug = (categoryTitle) => {
		return categoryTitle
			.toLowerCase()
			.replace(/[^a-zA-Z0-9\s]/g, '')
			.replace(/\s+/g, '-')
			.trim();
	};

	const handleCategoryClick = (category) => {
		// Use existing slug if available, otherwise generate one
		const slug = category.slug || createCategorySlug(category.title);
		navigate(`/design-page/${slug}`);
	};
	//filter categories based on categoryType as "platform"
	const filteredCategories = categories.filter(
		(category) => category.categoryType === 'platform'
	);

	if (loading) {
		return (
			<div className="min-h-[1024px] bg-gray-50">
				<div className="max-w-[1440px] mx-auto px-8 py-12">
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
							<p className="text-gray-600">Loading categories...</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-[1024px] bg-gray-50">
				<div className="max-w-[1440px] mx-auto px-8 py-12">
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="text-center">
							<p className="text-red-600 mb-4">{error}</p>
							<Button
								onClick={fetchCategories}
								className="bg-indigo-600 hover:bg-indigo-700 text-white">
								Retry
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-[1024px] bg-gray-50">
			<div className="max-w-[1440px] mx-auto px-8 py-12">
				{/* Hero Section */}
				<div className="relative h-[400px] mb-20 rounded-2xl overflow-hidden">
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage: `url('https://readdy.ai/api/search-image?query=Panoramic%20view%20of%20a%20luxurious%20open%20concept%20home%20interior...')`,
						}}></div>
					<div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
					<div className="relative h-full flex items-center">
						<div className="text-white max-w-xl px-12">
							<h2 className="text-4xl font-bold mb-4 font-serif">
								Redefine Your Home with Indian Elegance
							</h2>
							<p className="text-lg mb-6">
								From modular kitchens to vastu-aligned interiors, our expert
								designers bring a perfect blend of tradition and modern design
								to your home.
							</p>
							<Button className="bg-white text-orange-600 hover:bg-orange-100 px-6 py-3 !rounded-button cursor-pointer whitespace-nowrap">
								View Our Work
							</Button>
						</div>
					</div>
				</div>

				{/* Category Tabs */}
				<div className="mb-8 overflow-x-auto whitespace-nowrap">
					<div className="flex gap-4 pb-2 border-b border-gray-300">
						<Button
							variant={activeTab === 'All' ? 'default' : 'outline'}
							className="!rounded-full"
							onClick={() => setActiveTab('All')}>
							All
						</Button>
						{filteredCategories.map((cat) => (
							<Button
								key={cat._id}
								variant={activeTab === cat.title ? 'default' : 'outline'}
								className="!rounded-full"
								onClick={() => {
									setActiveTab(cat.title);
									handleCategoryClick(cat);
								}}>
								{cat.title}
							</Button>
						))}
					</div>
				</div>

				<h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">
					Explore Categories
				</h2>

				{filteredCategories.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-600 text-lg">No categories found</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
						{filteredCategories.map((category) => (
							<div
								key={category._id}
								onClick={() => handleCategoryClick(category)}
								className="cursor-pointer">
								<Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
									<div className="h-64 overflow-hidden">
										<img
											src={category.imageUrl}
											alt={category.title}
											className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
											onError={(e) => handleImageError(e, category.title)}
										/>
									</div>
									<div className="p-6">
										<h3 className="text-2xl font-semibold text-gray-800 mb-2">
											{category.title}
										</h3>
										<p className="text-gray-600 mb-4">
											{category.designs?.toLocaleString() || 0} Designs
										</p>
										<Button
											variant="outline"
											className="text-blue-600 border-blue-600 hover:bg-blue-50 !rounded-button cursor-pointer whitespace-nowrap">
											View Designs <i className="fas fa-arrow-right ml-2"></i>
										</Button>
									</div>
								</Card>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default FindPros;
