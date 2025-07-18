import {
	BookOpen,
	Heart,
	Home,
	Image,
	Layers,
	LogOut,
	MessageSquare,
	PlusCircle,
	Search,
	Settings,
	ShoppingBag,
	Star,
	User,
	UserPlus,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { categoryAPI } from './api';
import { useAuth } from './AuthContext';
function Navbar() {
	const location = useLocation();
	const { user, logout, isAuthenticated } = useAuth();
	const [openDropdown, setOpenDropdown] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [userDropdown, setUserDropdown] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [categories, setCategories] = useState([]);
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
	useEffect(() => {
		fetchCategories();
	}, []);
	useEffect(() => {
		console.log('Categories updated:', categories);
	}, [categories]);

	const createCategorySlug = (categoryTitle) => {
		return categoryTitle
			.toLowerCase()
			.replace(/[^a-zA-Z0-9\s]/g, '')
			.replace(/\s+/g, '-')
			.trim();
	};
	const vendorProfessionTypes = [
		'Interior Designer',
		'Architect',
		'Contractor',
		'Furniture Dealer',
		'Decorator',
		'Home Stylist',
		'Space Planner',
	];
	const handleCategoryClick = (category) => {
		const slug = category.slug || createCategorySlug(category.title);
		navigate(`/design-page/${slug}`);
	};
	const filteredSuggestions = categories;

	const navLinks = [
		{ name: 'Home', to: '/', icon: <Home size={20} /> },
		{ name: 'Features', to: '/feature', icon: <Star size={20} /> },
		{ name: 'Resources', to: '/resources', icon: <BookOpen size={20} /> },
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
				...vendorProfessionTypes.map((type) => ({
					name: type,
					to: `/design-ideas?profession=${encodeURIComponent(type)}`,
				})),
			],
		},
	];

	const getFirstName = (fullName) => {
		return fullName ? fullName.split(' ')[0] : 'User';
	};

	const handleLogout = async () => {
		await logout();
		setUserDropdown(false);
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

						{/* Search Input (Desktop) */}
						{/*/I want this search bar, to show the categories, as soon as user type a character, it will show the related category, and route it to that category page if clicked */}
						{/* Search Input (Desktop) */}
						<div className="hidden md:block relative w-1/3">
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search..."
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
							<Search
								className="absolute left-3 top-2.5 text-gray-500"
								size={16}
							/>
							{/* ✅ Only show when user types at least 2 characters */}
							{searchQuery.length >= 2 && filteredSuggestions.length > 0 && (
								<ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg text-sm max-h-60 overflow-y-auto">
									{filteredSuggestions
										.filter(
											(suggestion) =>
												suggestion.title
													.toLowerCase()
													.startsWith(searchQuery.toLowerCase()) // ✅ Only match from beginning
										)
										.map((suggestion, index) => (
											<li
												key={index}
												className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
												onClick={() => {
													setSearchQuery(suggestion.title);
													handleCategoryClick(suggestion);
												}}>
												{suggestion.title}
											</li>
										))}
								</ul>
							)}
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

									{/* ✅ UPDATED: Simplified Dropdown with only 3 options */}
									{userDropdown && (
										<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
											<Link
												to="/profile"
												className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												onClick={() => setUserDropdown(false)}>
												<User size={16} className="mr-2" />
												Profile
											</Link>
											{/* <Link
												to="/messages"
												className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												onClick={() => setUserDropdown(false)}>
												<MessageSquare size={16} className="mr-2" />
												Messages
											</Link> */}
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

			{/* Search Input (Mobile) */}
			<div className="md:hidden bg-white px-4 py-2">
				<div className="relative">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search..."
						className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<Search className="absolute left-3 top-2.5 text-gray-500" size={16} />

					{searchQuery.length >= 2 && filteredSuggestions.length > 0 && (
						<ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg text-sm max-h-60 overflow-y-auto">
							{filteredSuggestions
								.filter((suggestion) =>
									suggestion.title
										.toLowerCase()
										.startsWith(searchQuery.toLowerCase())
								)
								.map((suggestion, index) => (
									<li
										key={index}
										className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
										onClick={() => {
											setSearchQuery(suggestion.title);
											handleCategoryClick(suggestion);
										}}>
										{suggestion.title}
									</li>
								))}
						</ul>
					)}
				</div>
			</div>

			{/* Mobile Bottom Navbar */}
			<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
				<div className="flex justify-around items-center h-14">
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
						.map((link) => (
							<Link
								key={link.name}
								to={link.to}
								className={`flex flex-col items-center text-xs ${
									location.pathname === link.to
										? 'text-indigo-600'
										: 'text-gray-500 hover:text-indigo-600'
								}`}>
								{React.cloneElement(link.icon, { size: 16 })}{' '}
								{/* ✅ Smaller icons */}
								<span className="text-xs mt-1">{link.name}</span>{' '}
								{/* ✅ Smaller text with margin */}
							</Link>
						))}

					{/* Mobile User Authentication */}
					{isAuthenticated && user ? (
						<div className="flex flex-col items-center text-xs">
							<button
								onClick={() => setUserDropdown(!userDropdown)}
								className="flex flex-col items-center text-xs text-gray-500 hover:text-indigo-600">
								<User size={16} /> {/* ✅ Smaller icon */}
								<span className="text-xs mt-1">
									{getFirstName(user.name)}
								</span>{' '}
								{/* ✅ Smaller text */}
							</button>
						</div>
					) : (
						<>
							<Link
								to="/login"
								className="flex flex-col items-center text-xs text-gray-500 hover:text-indigo-600">
								<User size={16} /> {/* ✅ Smaller icon */}
								<span className="text-xs mt-1">Sign In</span>{' '}
								{/* ✅ Smaller text */}
							</Link>
							<Link
								to="/signup"
								className="flex flex-col items-center text-xs text-gray-500 hover:text-indigo-600">
								<UserPlus size={16} /> {/* ✅ Smaller icon */}
								<span className="text-xs mt-1">Sign Up</span>{' '}
								{/* ✅ Smaller text */}
							</Link>
						</>
					)}
				</div>

				{/* ✅ UPDATED: Mobile User Dropdown with only 3 options */}
				{userDropdown && isAuthenticated && user && (
					<div className="absolute bottom-14 right-4 w-48 bg-white rounded-md shadow-lg py-2 z-50">
						<Link
							to="/profile"
							className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							onClick={() => setUserDropdown(false)}>
							<User size={16} className="mr-2" />
							Profile
						</Link>
						{/* <Link
							to="/messages"
							className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							onClick={() => setUserDropdown(false)}>
							<MessageSquare size={16} className="mr-2" />
							Messages
						</Link> */}
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
