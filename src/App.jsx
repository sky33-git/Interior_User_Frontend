import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import DesignDetailPage from './pages/DesignDetailPage';
import DesignIdeas from './pages/DesignIdeasPage';
import DesignPage from './pages/DesignPage';
import Feature from './components/components/Feature';
import FindPros from './pages/FindPros';
import Footer from './components/components/Footer';
import { default as Gallery, default as Ideas } from './pages/Ideas';
import './index.css';
import Login from './pages/Login';
import Messages from './Messages';
import Navbar from './components/components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import Resources from './pages/Resources';
import Search from './pages/SearchAi';
import SignUp from './pages/SignUp';
import Toast from './Toast';
import VenderDetail from './pages/VenderDetail';
import { useLocation } from 'react-router-dom';
import AIChatGenerator from './pages/AIChatGenerator';
import ShortVideoFeed from './pages/ShortVideoFeed';


function AppContent() {
	const { toast, hideToast } = useAuth();
		const location = useLocation();

		const isHomePage = location.pathname === '/';


	return (
		<div className="relative">
			<Toast
				message={toast.message}
				type={toast.type}
				isVisible={toast.show}
				onClose={hideToast}
			/>
			<div className="fixed top-0 left-0 right-0 z-50">
				<Navbar />
			</div>
			{/* Navbar - hide on home page */}
			{/* {!isHomePage && (
				<div className="fixed top-0 left-0 right-0 z-50">
					<Navbar />
				</div>
			)} */}
			<div className="pt-16">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/feature" element={<Feature />} />
					{/* <Route path="/resources" element={<Resources />} /> */}
					{/* <Route path="/design-page" element={<DesignPage />} /> */}
					<Route path="/design-page/:category" element={<DesignPage />} />
					<Route path="/design-detail/:id" element={<DesignDetailPage />} />
					<Route path="/design-vendor/:id" element={<VenderDetail />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />

					{/* Protected Routes */}
					<Route
						path="/pros"
						element={
							<ProtectedRoute>
								<FindPros />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/ideas"
						element={
							<ProtectedRoute>
								<Ideas />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/search-ai"
						element={
							<ProtectedRoute>
								<Search />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/ai-chat"
						element={
							<ProtectedRoute>
							<AIChatGenerator/>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/design-ideas"
						element={
							<ProtectedRoute>
								<DesignIdeas />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/reels"
						element={
							<ProtectedRoute>
								<ShortVideoFeed/>
							</ProtectedRoute>
						}
					/>

					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/messages"
						element={
							<ProtectedRoute>
								<Messages />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
{/* Footer - hide on home page */}
			{!isHomePage && <Footer />}		</div>
	);
}

function App() {
	return (
		<Router>
			<AuthProvider>
				<AppContent />
			</AuthProvider>
		</Router>
	);
}

export default App;
