import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { register, registerWithGoogle } = useAuth();
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			setLoading(false);
			return;
		}

		try {
			await register({
				name: formData.fullName,
				email: formData.email,
				phone: formData.phone,
				password: formData.password,
			});
			navigate('/');
		} catch (error) {
			setError(error.message || 'Registration failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignUp = async () => {
		setLoading(true);
		setError('');

		try {
			await registerWithGoogle();
			navigate('/');
		} catch (error) {
			setError(error.message || 'Google sign up failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8"
			style={{
				backgroundImage: `url('https://readdy.ai/api/search-image?query=elegant%20interior%20design%20background%20with%20soft%20neutral%20tones%2C%20minimalist%20aesthetic%2C%20light%20beige%20and%20white%20color%20palette%2C%20subtle%20texture%2C%20professional%20and%20modern%20look%2C%20perfect%20for%20user%20registration%20page%20background&width=1920&height=1080&seq=1&orientation=landscape')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<div className="w-full max-w-md">
				<Card className="shadow-xl border-0">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold">
							Join Interior 5D
						</CardTitle>
						<CardDescription>
							Create your account to explore beautiful interior designs and
							connect with professionals
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{error && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
								{error}
							</div>
						)}

						<div className="space-y-3">
							<Button
								variant="outline"
								className="w-full flex items-center justify-center gap-2 h-11 border-gray-300 !rounded-button cursor-pointer whitespace-nowrap"
								onClick={handleGoogleSignUp}
								disabled={loading}>
								<i className="fab fa-google text-lg"></i>
								<span>Register with Google</span>
							</Button>
						</div>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white px-2 text-gray-500">
									or continue with email
								</span>
							</div>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="fullName">Full Name</Label>
								<Input
									id="fullName"
									placeholder="Enter your full name"
									className="h-11 border-gray-300"
									value={formData.fullName}
									onChange={handleInputChange}
									disabled={loading}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email address"
									className="h-11 border-gray-300"
									value={formData.email}
									onChange={handleInputChange}
									disabled={loading}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="phone">Phone Number</Label>
								<Input
									id="phone"
									type="tel"
									placeholder="Enter your phone number"
									className="h-11 border-gray-300"
									value={formData.phone}
									onChange={handleInputChange}
									disabled={loading}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<div className="relative">
									<Input
										id="password"
										type={showPassword ? 'text' : 'password'}
										placeholder="Create a password"
										className="h-11 border-gray-300 pr-10"
										value={formData.password}
										onChange={handleInputChange}
										disabled={loading}
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
										<i
											className={`fa ${
												showPassword ? 'fa-eye-slash' : 'fa-eye'
											}`}></i>
									</button>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<div className="relative">
									<Input
										id="confirmPassword"
										type={showConfirmPassword ? 'text' : 'password'}
										placeholder="Confirm your password"
										className="h-11 border-gray-300 pr-10"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										disabled={loading}
										required
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
										<i
											className={`fa ${
												showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'
											}`}></i>
									</button>
								</div>
							</div>

							<Button
								type="submit"
								className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button cursor-pointer whitespace-nowrap"
								disabled={loading}>
								{loading ? 'Creating Account...' : 'Create Account'}
							</Button>
						</form>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<p className="text-center text-sm text-gray-600">
							Already have an account?{' '}
							<Link
								to={'/login'}
								className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer">
								Login
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default Signup;
