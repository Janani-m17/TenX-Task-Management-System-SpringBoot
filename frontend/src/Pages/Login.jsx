import React, { useState } from "react";
import "../styles/login.css";
import Illustration from "../assets/login-illustration.svg";
import Tenxlogo from "../assets/Tenx_logo.jpg";
import { Link } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Handle form submission
	const handleSubmit = e => {
		e.preventDefault();
		console.log("Login attempt with:", { email, password });
		// Add authentication logic here (API call or validation)
	};

	return (
		<div className='login-container'>
			{/* Main Login Card */}
			<div className='login-card'>
				{/* Left Side - Illustration */}
				<div className='login-illustration'>
					<img
						src={Illustration}
						alt='Login Illustration'
						className='illustration-svg'
					/>
					<div className='feature-bubbles'>
						<div className='feature-bubble document'>
							<span className='icon'>📄</span>
						</div>
						<div className='feature-bubble list'>
							<span className='icon'>≡</span>
						</div>
						<div className='feature-bubble check'>
							<span className='icon'>✓</span>
						</div>
					</div>
				</div>

				{/* Right Side - Login Form */}
				<div className='login-form-container'>
					{/* Logo and Brand */}
					<div className='brand-container'>
						<img
							src={Tenxlogo}
							alt='TenX Logo'
							className='brand-logo'
						/>
						<h1 className='brand-name'>TenX</h1>
					</div>

					{/* Form Section */}
					<form
						className='login-form'
						onSubmit={handleSubmit}>
						{/* Email Input */}
						<div className='form-group'>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								id='email'
								placeholder='Your email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</div>

						{/* Password Input */}
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								id='password'
								placeholder='Your password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							className='submit-button'>
							Continue <span className='arrow'>→</span>
						</button>

						{/* Navigation to Signup */}
						<p className='switch-page'>
							Don't have an account? <Link to='/signup'>Sign up</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
