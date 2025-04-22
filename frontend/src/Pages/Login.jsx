import React, { useState } from "react";
import "../styles/login.css";
import Illustration from "../assets/login-illustration.svg";
import Logo from "../assets/Tenx_logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { checkTokenExpiration } from "../Auth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate(); // For redirection after login

	// Handle form submission
	const handleSubmit = async e => {
		e.preventDefault();
		setError("");

		checkTokenExpiration();

		const loginData = { email, password };

		try {
			const response = await fetch("http://localhost:8080/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginData),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText || "Login failed");
			}

			const data = await response.json();
			localStorage.setItem("token", data.token);
			alert("Login successful!");
			navigate("/tenxpage");
		} catch (error) {
			console.error("Login error:", error);
			setError("Invalid email or password");
		}
	};

	return (
		<div>
			<Header />
			<div className='login-container'>
				<div className='login-card'>
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

					<div className='login-form-container'>
						<div className='brand-container'>
							<img
								src={Logo}
								alt='TenX Logo'
								className='brand-logo'
							/>
							<h1 className='brand-name'>TenX</h1>
						</div>

						<form
							className='login-form'
							onSubmit={handleSubmit}>
							{error && <p className='error-message'>{error}</p>}

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

							<button
								type='submit'
								className='submit-button'>
								Continue <span className='arrow'>→</span>
							</button>

							<p className='switch-page'>
								Don't have an account? <Link to='/signup'>Sign up</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
