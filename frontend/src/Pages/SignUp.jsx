import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"; // Reuse the same CSS as the Login page
import Illustration from "../assets/login-illustration.svg";
import Logo from "../assets/Tenx_logo.jpg";
import Header from "../components/Header";

const SignUp = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, _setLoading] = useState(false);
	const navigate = useNavigate(); // Redirect after signup

	const handleSubmit = async e => {
		e.preventDefault();

		const userData = {
			name,
			email,
			password,
		};

		try {
			const response = await fetch("http://localhost:8080/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			const responseData = await response.json();

			if (response.ok) {
				alert("User registered successfully! You can now log in.");
				navigate("/login");
			} else {
				alert(responseData.error || "Registration failed.");
			}
		} catch (error) {
			console.error("Error during registration:", error);
			alert("Something went wrong. Please try again.");
		}
	};

	return (
		<div>
			<Header />
			<div className='login-container'>
				{/* Main Signup Card */}
				<div className='login-card'>
					{/* Left Side - Illustration */}
					<div className='login-illustration'>
						<img
							src={Illustration}
							alt='Signup Illustration'
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

					{/* Right Side - Signup Form */}
					<div className='login-form-container'>
						{/* Logo and Brand */}
						<div className='brand-container'>
							<img
								src={Logo}
								alt='TenX Logo'
								className='brand-logo'
							/>
							<h1 className='brand-name'>TenX</h1>
						</div>

						{/* Form Section */}
						<form
							className='login-form'
							onSubmit={handleSubmit}>
							{/* Name Input */}
							<div className='form-group'>
								<label htmlFor='name'>Name</label>
								<input
									type='text'
									id='name'
									placeholder='Your name'
									value={name}
									onChange={e => setName(e.target.value)}
									required
								/>
							</div>

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
									placeholder='Create a password'
									value={password}
									onChange={e => setPassword(e.target.value)}
									required
								/>
							</div>

							{/* Submit Button */}
							<button
								type='submit'
								className='submit-button'
								disabled={loading}>
								{loading ? "Signing Up..." : "Sign Up"}{" "}
								<span className='arrow'>→</span>
							</button>

							{/* Navigation to Login */}
							<p className='switch-page'>
								Already have an account? <Link to='/login'>Log in</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
