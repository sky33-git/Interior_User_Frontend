import {
	Calendar,
	CheckCircle,
	Clock,
	Mail,
	MailOpen,
	MapPin,
	MessageSquare,
	Phone,
	Search,
	Send,
	User as UserIcon,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import api from './api';

const Messages = () => {
	const { user, isAuthenticated } = useAuth();
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTab, setSelectedTab] = useState('all');

	// Fetch user messages using your existing API
	useEffect(() => {
		const fetchMessages = async () => {
			if (!isAuthenticated) {
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				setError('');
				console.log('Fetching user messages...');

				// Use your existing API method
				const response = await api.messages.getUserMessages(1, 20);
				console.log('Messages response:', response);

				if (response && response.messages) {
					setMessages(response.messages);
				} else {
					setMessages([]);
				}
			} catch (error) {
				console.error('Failed to fetch messages:', error);
				setError('Failed to load messages: ' + error.message);
				setMessages([]);
			} finally {
				setLoading(false);
			}
		};

		fetchMessages();
	}, [isAuthenticated]);

	// Process messages for display
	const processedMessages = messages.map((message) => ({
		...message,
		vendor: {
			name: message.vendorId?.name || 'Unknown Vendor',
			professionType: message.vendorId?.professionType || 'Professional',
			profileImage: message.vendorId?.profileImage,
			initial: message.vendorId?.name
				? message.vendorId.name[0].toUpperCase()
				: 'V',
		},
		product: {
			title:
				message.productId?.name ||
				message.productId?.title ||
				'General Inquiry',
		},
		vendorReply: message.reply?.message || null,
		repliedAt: message.reply?.repliedAt || null,
		hasReply: !!message.reply?.message,
	}));

	// Calculate simple stats
	const stats = {
		total: messages.length,
		pending: messages.filter((m) => !m.reply?.message).length,
		replied: messages.filter((m) => !!m.reply?.message).length,
	};

	// Filter messages
	const filteredMessages = processedMessages.filter((message) => {
		const matchesSearch =
			message.vendor?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			message.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			message.product?.title?.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesTab =
			selectedTab === 'all' ||
			(selectedTab === 'pending' && !message.hasReply) ||
			(selectedTab === 'replied' && message.hasReply);

		return matchesSearch && matchesTab;
	});

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const getTimeAgo = (dateString) => {
		const now = new Date();
		const messageDate = new Date(dateString);
		const diffInHours = Math.floor((now - messageDate) / (1000 * 60 * 60));

		if (diffInHours < 1) return 'Just now';
		if (diffInHours < 24) return `${diffInHours}h ago`;
		const diffInDays = Math.floor(diffInHours / 24);
		if (diffInDays < 7) return `${diffInDays}d ago`;
		return formatDate(dateString);
	};

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Authentication Required
					</h2>
					<p className="text-gray-600">Please log in to view your messages.</p>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading your messages...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center max-w-md">
					<p className="text-red-600 mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">My Messages</h1>
					<p className="text-gray-600 mt-2">
						View your inquiries and vendor responses
					</p>
				</div>

				{/* Simple Stats */}
				<div className="grid grid-cols-3 gap-4 mb-8">
					<div className="bg-white rounded-lg shadow-sm p-4 text-center">
						<p className="text-2xl font-bold text-gray-900">{stats.total}</p>
						<p className="text-sm text-gray-600">Total</p>
					</div>
					<div className="bg-white rounded-lg shadow-sm p-4 text-center">
						<p className="text-2xl font-bold text-yellow-600">
							{stats.pending}
						</p>
						<p className="text-sm text-gray-600">Pending</p>
					</div>
					<div className="bg-white rounded-lg shadow-sm p-4 text-center">
						<p className="text-2xl font-bold text-green-600">{stats.replied}</p>
						<p className="text-sm text-gray-600">Replied</p>
					</div>
				</div>

				{/* Search */}
				<div className="mb-6">
					<div className="relative">
						<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
						<input
							type="text"
							placeholder="Search messages..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
						/>
					</div>
				</div>

				{/* Tabs */}
				<div className="mb-6">
					<div className="flex space-x-4 border-b border-gray-200">
						{['all', 'pending', 'replied'].map((tab) => (
							<button
								key={tab}
								onClick={() => setSelectedTab(tab)}
								className={`py-2 px-4 text-sm font-medium border-b-2 capitalize ${
									selectedTab === tab
										? 'border-indigo-500 text-indigo-600'
										: 'border-transparent text-gray-500 hover:text-gray-700'
								}`}>
								{tab}{' '}
								{tab === 'pending' && stats.pending > 0 && (
									<span className="ml-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
										{stats.pending}
									</span>
								)}
							</button>
						))}
					</div>
				</div>

				{/* Messages List */}
				<div className="space-y-4">
					{filteredMessages.length === 0 ? (
						<div className="bg-white rounded-lg shadow-sm p-8 text-center">
							<MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<p className="text-gray-600">
								{messages.length === 0
									? 'No messages sent yet.'
									: 'No messages found matching your criteria.'}
							</p>
						</div>
					) : (
						filteredMessages.map((message) => (
							<div
								key={message._id}
								className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-500">
								{/* Header */}
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center space-x-3">
										<div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
											<span className="text-white font-bold text-sm">
												{message.vendor.initial}
											</span>
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												{message.vendor.name}
											</h3>
											<p className="text-sm text-gray-600">
												{message.vendor.professionType}
											</p>
											<p className="text-xs text-gray-500">
												{message.product.title}
											</p>
										</div>
									</div>
									<div className="text-right">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												message.hasReply
													? 'bg-green-100 text-green-800'
													: 'bg-yellow-100 text-yellow-800'
											}`}>
											{message.hasReply ? 'Replied' : 'Pending'}
										</span>
										<p className="text-xs text-gray-500 mt-1">
											{getTimeAgo(message.createdAt)}
										</p>
									</div>
								</div>

								{/* Your Message */}
								<div className="bg-gray-50 rounded-lg p-4 mb-4">
									<p className="text-sm font-medium text-gray-700 mb-2">
										Your Message:
									</p>
									<p className="text-gray-800">"{message.message}"</p>
									<div className="flex items-center justify-between mt-3 text-xs text-gray-500">
										<span>Sent on {formatDate(message.createdAt)}</span>
										<div className="flex items-center space-x-3">
											{message.phone && (
												<span>
													<Phone className="h-3 w-3 inline mr-1" />
													{message.phone}
												</span>
											)}
											{message.pincode && (
												<span>
													<MapPin className="h-3 w-3 inline mr-1" />
													{message.pincode}
												</span>
											)}
										</div>
									</div>
								</div>

								{/* Vendor Reply */}
								{message.hasReply && (
									<div className="bg-green-50 rounded-lg p-4">
										<p className="text-sm font-medium text-green-800 mb-2">
											Vendor Reply:
										</p>
										<p className="text-green-700">"{message.vendorReply}"</p>
										<p className="text-xs text-green-600 mt-2">
											Replied on {formatDate(message.repliedAt)}
										</p>
									</div>
								)}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Messages;
