import {
	BookOpen,
	Briefcase,
	Heart,
	Home,
	Image,
	Layers,
	LogOut,
	MapPin,
	MessageSquare,
	PlusCircle,
	Search,
	Settings,
	ShoppingBag,
	Star,
	User,
	UserPlus,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api, { categoryAPI } from '../../api';
import { useAuth } from '../../AuthContext';

function Navbar() {
	const location = useLocation();
	const { user, logout, isAuthenticated } = useAuth();
	const [openDropdown, setOpenDropdown] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [userDropdown, setUserDropdown] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [categories, setCategories] = useState([]);

	// ✅ NEW: Search results states
	const [searchResults, setSearchResults] = useState({
		categories: [],
		vendors: [],
		cities: [],
		professions: [],
	});
	const [searchLoading, setSearchLoading] = useState(false);

	const navigate = useNavigate();

	const fetchCategories = async () => {
		try {
			setLoading(true);
			setError('');

			const response = await categoryAPI.getAllCategories();
			if (response && response.data) {
				console.log('Fetched response from navbar : ', response.data);
				const filteredCategories = response.data.filter(
					(category) => category.categoryType === 'platform'
				);
				setCategories(filteredCategories);
				console.log('Fetched categories from navbar : ', filteredCategories);
			}
		} catch (error) {
			console.error('Failed to fetch categories:', error);
			setError('Failed to load categories. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	// ✅ NEW: Enhanced search function
	const performSearch = useCallback(
		async (query) => {
			if (!query || query.length < 2) {
				setSearchResults({
					categories: [],
					vendors: [],
					cities: [],
					professions: [],
				});
				return;
			}

			try {
				setSearchLoading(true);

				// Search categories
				const matchingCategories = categories.filter((category) =>
					category.title.toLowerCase().includes(query.toLowerCase())
				);

				// Search vendors
				const vendorResponse = await api.vendors.getAllVendors({
					search: query,
					limit: 8, // Limit results for dropdown
				});

				const vendors = vendorResponse.success
					? vendorResponse.data.vendors || []
					: [];

				// Extract unique cities from vendors
				const allCities = vendors
					.map((vendor) => vendor.location?.city)
					.filter(Boolean)
					.filter(
						(city, index, self) =>
							city.toLowerCase().includes(query.toLowerCase()) &&
							self.indexOf(city) === index
					)
					.slice(0, 5); // Limit cities

				// Filter professions
				const vendorProfessionTypes = [
					'Interior Designer',
					'Architect',
					'Contractor',
					'Furniture Dealer',
					'Decorator',
					'Home Stylist',
					'Space Planner',
				];

				const matchingProfessions = vendorProfessionTypes.filter((profession) =>
					profession.toLowerCase().includes(query.toLowerCase())
				);

				setSearchResults({
					categories: matchingCategories.slice(0, 3),
					vendors: vendors.slice(0, 8),
					cities: allCities,
					professions: matchingProfessions,
				});
				console.log('Vendors here ', vendors);
			} catch (error) {
				console.error('Search failed:', error);
				setSearchResults({
					categories: [],
					vendors: [],
					cities: [],
					professions: [],
				});
			} finally {
				setSearchLoading(false);
			}
		},
		[categories]
	);

	// ✅ NEW: Debounced search
	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			performSearch(searchQuery);
		}, 300);

		return () => clearTimeout(debounceTimer);
	}, [searchQuery, performSearch]);

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		console.log('Categories updated:', categories);
	}, [categories]);

	// ✅ NEW: Image processing function for vendor photos
	const processImageUrl = (imageUrl) => {
		if (!imageUrl) return null;
		if (imageUrl.startsWith('http')) return imageUrl;
		return `https://res.cloudinary.com/dbpjwgvst/image/upload/c_fill,f_auto,h_40,q_auto,w_40/v1/${imageUrl}`;
	};

	const createCategorySlug = (categoryTitle) => {
		return categoryTitle
			.toLowerCase()
			.replace(/[^a-zA-Z0-9\s]/g, '')
			.replace(/\s+/g, '-')
			.trim();
	};

	const handleCategoryClick = (category) => {
		const slug = category.slug || createCategorySlug(category.title);
		navigate(`/design-page/${slug}`);
		setSearchQuery('');
	};

	// ✅ NEW: Handle vendor click
	const handleVendorClick = (vendor) => {
		navigate(`/design-vendor/${vendor._id}`);
		setSearchQuery('');
	};

	// ✅ NEW: Handle city click
	const handleCityClick = (city) => {
		navigate(`/design-ideas?city=${encodeURIComponent(city)}`);
		setSearchQuery('');
	};

	// ✅ NEW: Handle profession click
	const handleProfessionClick = (profession) => {
		navigate(`/design-ideas?profession=${encodeURIComponent(profession)}`);
		setSearchQuery('');
	};

	const hasSearchResults = () => {
		return (
			searchResults.categories.length > 0 ||
			searchResults.vendors.length > 0 ||
			searchResults.cities.length > 0 ||
			searchResults.professions.length > 0
		);
	};

	const navLinks = [
		{ name: 'Home', to: '/', icon: <Home size={20} /> },
		// { name: 'Features', to: '/feature', icon: <Star size={20} /> },
		// { name: 'Resources', to: '/resources', icon: <BookOpen size={20} /> },
		{ name: 'Ai Tool', to: '/search-ai', icon: <PlusCircle size={20} /> },
		{
			name: "Idea's",
			to: '/pros',
			icon: <Image size={20} />,
			dropdown: true,
			children: categories.map((category) => ({
				name: category.title,
				to: `/design-page/${createCategorySlug(category.title)}`,
			})),
		},
		{
			name: 'Find Pros',
			to: '/design-ideas',
			icon: <Image size={20} />,
			dropdown: true,
			children: [
				'Interior Designer',
				'Architect',
				'Contractor',
				'Furniture Dealer',
				'Decorator',
				'Home Stylist',
				'Space Planner',
			].map((type) => ({
				name: type,
				to: `/design-ideas?profession=${encodeURIComponent(type)}`,
			})),
		},
	];

	const getFirstName = (fullName) => {
		return fullName ? fullName.split(' ')[0] : 'User';
	};

	const handleLogout = async () => {
		await logout();
		setUserDropdown(false);
	};

	const SearchResults = () => {
		if (searchQuery.length < 2) return null;

		return (
			<div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
				{searchLoading ? (
					<div className="px-4 py-3 text-sm text-gray-500 flex items-center">
						<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500 mr-2"></div>
						Searching...
					</div>
				) : hasSearchResults() ? (
					<div className="py-2">
						{searchResults.categories.length > 0 && (
							<div className="mb-2">
								<div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
									Categories
								</div>
								{searchResults.categories.map((category, index) => (
									<div
										key={`category-${index}`}
										className="px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center"
										onClick={() => handleCategoryClick(category)}>
										<Layers className="w-4 h-4 text-indigo-500 mr-3" />
										<span className="text-sm">{category.title}</span>
									</div>
								))}
							</div>
						)}

						{searchResults.vendors.length > 0 && (
							<div className="mb-2">
								<div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
									Vendors
								</div>
								{searchResults.vendors.map((vendor, index) => (
									<div
										key={`vendor-${index}`}
										className="px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center"
										onClick={() => handleVendorClick(vendor)}>
										<div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-3 flex-shrink-0">
											{vendor.images.profileImage ? (
												<img
													src={processImageUrl(vendor.images.profileImage)}
													alt={vendor.name}
													className="w-full h-full object-cover"
													onError={(e) => {
														e.target.style.display = 'none';
													}}
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-500">
													{vendor.name?.charAt(0)?.toUpperCase() || 'V'}
												</div>
											)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="text-sm font-medium text-gray-900 truncate">
												{vendor.name}
											</div>
											<div className="text-xs text-gray-500 truncate">
												{vendor.professionType} •{' '}
												{vendor.location?.city || 'Location not specified'}
											</div>
										</div>
									</div>
								))}
							</div>
						)}

						{searchResults.cities.length > 0 && (
							<div className="mb-2">
								<div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
									Cities
								</div>
								{searchResults.cities.map((city, index) => (
									<div
										key={`city-${index}`}
										className="px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center"
										onClick={() => handleCityClick(city)}>
										<MapPin className="w-4 h-4 text-green-500 mr-3" />
										<span className="text-sm">{city}</span>
										<span className="text-xs text-gray-400 ml-auto">
											Find pros in {city}
										</span>
									</div>
								))}
							</div>
						)}

						{/* Professions Section */}
						{searchResults.professions.length > 0 && (
							<div>
								<div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
									Professions
								</div>
								{searchResults.professions.map((profession, index) => (
									<div
										key={`profession-${index}`}
										className="px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center"
										onClick={() => handleProfessionClick(profession)}>
										<Briefcase className="w-4 h-4 text-blue-500 mr-3" />
										<span className="text-sm">{profession}</span>
									</div>
								))}
							</div>
						)}
					</div>
				) : (
					<div className="px-4 py-3 text-sm text-gray-500">
						No results found for "{searchQuery}"
					</div>
				)}
			</div>
		);
	};

	return (
		<>
			{/* Desktop Navbar */}
			<header className="bg-white shadow-sm relative z-50 hidden md:block">
				<div className="mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<Link to={'/'}>
							<div className="text-2xl font-bold text-indigo-600">
								Interior 5D
							</div>
						</Link>
						<div className="hidden md:block relative w-1/3">
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search categories, vendors, cities, professions..."
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
							<Search
								className="absolute left-3 top-2.5 text-gray-500"
								size={16}
							/>
							<SearchResults />
						</div>

						<nav className="ml-10 flex items-center space-x-5">
							{navLinks
								.filter((link) => {
									// ✅ Show Features and Resources to everyone
									if (link.name === 'Features' || link.name === 'Resources') {
										return true;
									}
									// ✅ Show Home to everyone
									if (link.name === 'Home') {
										return true;
									}
									// ✅ Show protected routes only if authenticated
									return isAuthenticated;
								})
								.map((link) =>
									link.children ? (
										<div
											className="relative"
											key={link.name}
											onMouseEnter={() => setOpenDropdown(link.name)}
											onMouseLeave={() => setOpenDropdown(null)}>
											<Link
												to={link.to}
												className={`px-3 py-2 text-md font-medium flex items-center gap-1 ${
													location.pathname === link.to
														? 'text-indigo-600 border-b-2 border-indigo-600'
														: 'text-gray-500 hover:text-indigo-600'
												}`}>
												{link.name} {openDropdown === link.name ? '▴' : '▾'}
											</Link>
											{openDropdown === link.name && (
												<div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg p-4 rounded-md flex gap-8 z-50">
													{[
														...Array(
															Math.ceil(link.children.length / 10)
														).keys(),
													].map((col) => (
														<div
															key={col}
															className="flex flex-col items-center">
															{link.children
																.slice(col * 10, (col + 1) * 10)
																.map((child) => (
																	<Link
																		key={child.name}
																		to={child.to}
																		onClick={() => {
																			if (link.name === "Idea's") {
																				handleCategoryClick(
																					categories.find(
																						(cat) => cat.title === child.name
																					)
																				);
																				setOpenDropdown(null);
																			}
																		}}
																		className={`w-40 text-sm py-1 text-start ${
																			location.pathname === child.to
																				? 'text-indigo-600 font-semibold'
																				: 'text-gray-700 hover:font-semibold hover:text-indigo-600'
																		}`}>
																		{child.name}
																	</Link>
																))}
														</div>
													))}
												</div>
											)}
										</div>
									) : (
										<Link
											key={link.name}
											to={link.to}
											className={`px-3 py-2 text-md font-medium cursor-pointer ${
												location.pathname === link.to
													? 'text-indigo-600 border-b-2 border-indigo-600'
													: 'text-gray-500 hover:text-indigo-600'
											}`}>
											{link.name}
										</Link>
									)
								)}

							{/* User Authentication Section */}
							{isAuthenticated && user ? (
								<div className="relative">
									<button
										onClick={() => setUserDropdown(!userDropdown)}
										className="flex items-center space-x-2 px-3 py-2 text-md font-medium text-gray-500 hover:text-indigo-600 cursor-pointer">
										<User size={20} />
										<span>Hi, {getFirstName(user.name)}</span>
									</button>

									{userDropdown && (
										<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
											<Link
												to="/profile"
												className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												onClick={() => setUserDropdown(false)}>
												<User size={16} className="mr-2" />
												Profile
											</Link>
											<hr className="my-1" />
											<button
												onClick={handleLogout}
												className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
												<LogOut size={16} className="mr-2" />
												Logout
											</button>
										</div>
									)}
								</div>
							) : (
								<>
									<Link
										to="/login"
										className="px-3 py-2 text-md font-medium text-gray-500 hover:text-indigo-600 cursor-pointer">
										Sign In
									</Link>
									<Link
										to="/signup"
										className="px-3 py-2 text-md font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer">
										Sign Up
									</Link>
								</>
							)}
						</nav>
					</div>
				</div>
			</header>

			{/* Mobile Top Title */}
			<div className="md:hidden bg-white shadow-sm px-4 py-3 text-xl font-bold text-indigo-600 text-center">
				Interior 5D
			</div>

			{/* ✅ Enhanced Search Input (Mobile) */}
			<div className="md:hidden bg-white px-4 py-2">
				<div className="relative">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search categories, vendors, cities..."
						className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
					<SearchResults />
				</div>
			</div>

			{/* Mobile Bottom Navbar */}
			<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
				<div className="flex justify-around items-center h-14">
					{navLinks
						.filter((link) => {
							if (link.name === 'Features' || link.name === 'Resources') {
								return true;
							}
							if (link.name === 'Home') {
								return true;
							}
							return isAuthenticated;
						})
						.map((link) => (
							<Link
								key={link.name}
								to={link.to}
								className={`flex flex-col items-center text-xs ${
									location.pathname === link.to
										? 'text-indigo-600'
										: 'text-gray-500 hover:text-indigo-600'
								}`}>
								{React.cloneElement(link.icon, { size: 16 })}
								<span className="text-xs mt-1">{link.name}</span>
							</Link>
						))}

					{isAuthenticated && user ? (
						<div className="flex flex-col items-center text-xs">
							<button
								onClick={() => setUserDropdown(!userDropdown)}
								className="flex flex-col items-center text-xs text-gray-500 hover:text-indigo-600">
								<User size={16} />
								<span className="text-xs mt-1">{getFirstName(user.name)}</span>
							</button>
						</div>
					) : (
						<>
							<Link
								to="/login"
								className="flex flex-col items-center text-xs text-gray-500 hover:text-indigo-600">
								<User size={16} />
								<span className="text-xs mt-1">Sign In</span>
							</Link>
							<Link
								to="/signup"
								className="flex flex-col items-center text-xs text-gray-500 hover:text-indigo-600">
								<UserPlus size={16} />
								<span className="text-xs mt-1">Sign Up</span>
							</Link>
						</>
					)}
				</div>

				{userDropdown && isAuthenticated && user && (
					<div className="absolute bottom-14 right-4 w-48 bg-white rounded-md shadow-lg py-2 z-50">
						<Link
							to="/profile"
							className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							onClick={() => setUserDropdown(false)}>
							<User size={16} className="mr-2" />
							Profile
						</Link>
						<hr className="my-1" />
						<button
							onClick={handleLogout}
							className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
							<LogOut size={16} className="mr-2" />
							Logout
						</button>
					</div>
				)}
			</nav>
		</>
	);
}

export default Navbar;
