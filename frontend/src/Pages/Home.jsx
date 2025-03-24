import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Home.css";
import Tenxlogo from "../assets/Tenx_logo.jpg";

const Home = () => {
	const [animate, setAnimate] = useState(true);
	const [fadeIn, setFadeIn] = useState(false);
	const navigate = useNavigate(); // Initialize useNavigate

	useEffect(() => {
		setTimeout(() => {
			setAnimate(false);
		}, 1000);

		setTimeout(() => {
			setFadeIn(true);
		}, 1200);
	}, []);

	return (
		<div className='app'>
			<header className='header'>
				<div className='container header-container'>
					<div className='logo-container'>
						<img
							src={Tenxlogo}
							alt='Tenx logo'
							className='logo'
						/>
						<div className={`logo-text ${animate ? "bounce" : ""}`}>
							<span>T</span>
							<span>e</span>
							<span>n</span>
							<span>X</span>
						</div>
					</div>

					<div className='header-actions'>
						<button className='language-selector'></button>
						<a
							onClick={() => navigate("/login")}
							className='login-link'>
							Login
						</a>
						<a
							onClick={() => navigate("/signup")}
							className='signup-link'>
							SignUp
						</a>
					</div>
				</div>
			</header>

			<main className='main-content'>
				<div className='container'>
					<section className='hero-section'>
						<h1 className={`hero-title ${fadeIn ? "fade-in" : ""}`}>
							Simplify task management
							<br />
							and prioritize work
						</h1>
						<p className='hero-description'>
							Tenx helps you stay organized and focused, bringing everything you
							need into one place. Prioritize tasks, collaborate effortlessly,
							and achieve more with ease.
						</p>
						<div className='cta-buttons'>
							<button
								className='get-started-btn hero-cta'
								onClick={() => navigate("/login")}>
								<span className='text'>Get started</span>
							</button>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};

export default Home;
