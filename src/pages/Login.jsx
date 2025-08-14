import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const { login, loginWithGoogle } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await login({ email, password });
			navigate(from, { replace: true });
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		setLoading(true);

		try {
			await loginWithGoogle();
			navigate(from, { replace: true });
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-md shadow-lg !rounded-button">
				<CardHeader className="space-y-2 text-center">
					<div className="flex justify-center mb-2">
						<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
							<i className="fas fa-home text-white"></i>
						</div>
					</div>
					<h1 className="text-2xl font-bold text-indigo-600">Welcome Back</h1>
					<p className="text-gray-500 text-sm">
						Login to your Interior 5D account
					</p>
				</CardHeader>

				<CardContent className="space-y-6">
					{/* Social Login Buttons */}
					<div className="space-y-3">
						<Button
							variant="outline"
							className="w-full flex items-center justify-center gap-2 border-gray-300 !rounded-button whitespace-nowrap cursor-pointer"
							type="button"
							onClick={handleGoogleLogin}
							disabled={loading}>
							<i className="fab fa-google text-red-500"></i>
							<span className="text-indigo-600">Continue with Google</span>
						</Button>
					</div>

					{/* Divider */}
					<div className="relative">
						<Separator className="my-4" />
						<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
							or
						</span>
					</div>

					{/* Email Login Form */}
					<form onSubmit={handleSubmit} className="space-y-4 text-indigo-600">
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email Address
							</label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								className="w-full !rounded-button"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={loading}
								required
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="text-sm font-medium">
									Password
								</label>
								<a
									href="#"
									className="text-xs text-primary hover:underline cursor-pointer">
									Forgot password?
								</a>
							</div>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter your password"
									className="w-full pr-10 !rounded-button"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									disabled={loading}
									required
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
									onClick={togglePasswordVisibility}>
									<i
										className={`fas ${
											showPassword ? 'fa-eye-slash' : 'fa-eye'
										}`}></i>
								</button>
							</div>
						</div>

						<Button
							type="submit"
							className="w-full bg-white border border-gray hover:bg-indigo-600 hover:text-white text-indigo-600 !rounded-button whitespace-nowrap cursor-pointer"
							disabled={loading}>
							{loading ? 'Logging in...' : 'Login'}
						</Button>
					</form>
				</CardContent>

				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-600">
						Don't have an account?
						<Link
							to={'/signup'}
							className="font-medium ml-1 text-indigo-600 hover:underline cursor-pointer">
							Register
						</Link>
					</p>
				</CardFooter>
			</Card>

			{/* Background Image */}
			<div className="fixed bottom-0 right-0 w-1/2 h-1/2 -z-10 opacity-10">
				<img
					src="https://readdy.ai/api/search-image?query=elegant%20interior%20design%20with%20modern%20furniture%2C%20minimalist%20style%2C%20soft%20lighting%2C%20neutral%20color%20palette%2C%20professional%20photography%20with%20shallow%20depth%20of%20field%2C%20high-end%20residential%20space%20with%20clean%20lines%20and%20natural%20materials&width=800&height=600&seq=1&orientation=landscape"
					alt="Interior design background"
					className="w-full h-full object-cover object-top"
				/>
			</div>
		</div>
	);
};

export default Login;
