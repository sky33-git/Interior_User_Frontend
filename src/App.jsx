import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import DesignDetailPage from './DesignDetailPage';
import DesignIdeas from './DesignIdeasPage';
import DesignPage from './DesignPage';
import Feature from './Feature';
import FindPros from './FindPros';
import Footer from './Footer';
import { default as Gallery, default as Ideas } from './Ideas';
import './index.css';
import Login from './Login';
import Messages from './Messages';
import Navbar from './Navbar';
import Home from './pages/Home';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import Resources from './Resources';
import Search from './SearchAi';
import SignUp from './SignUp';
import Test from './Test';
import Toast from './Toast';
import VenderDetail from './VenderDetail';

function AppContent() {
	const { toast, hideToast } = useAuth();

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
			<div className="pt-16">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/test" element={<Test />} />
					<Route path="/feature" element={<Feature />} />
					<Route path="/resources" element={<Resources />} />
					<Route path="/design-page" element={<DesignPage />} />
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
						path="/design-ideas"
						element={
							<ProtectedRoute>
								<DesignIdeas />
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
					{/* <Route
						path="/messages"
						element={
							<ProtectedRoute>
								<Messages />
							</ProtectedRoute>
						}
					/> */}
				</Routes>
			</div>
			<Footer />
		</div>
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
