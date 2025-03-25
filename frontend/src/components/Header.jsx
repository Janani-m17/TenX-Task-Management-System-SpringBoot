import React from "react";
import { useNavigate } from "react-router-dom";
import Tenxlogo from "../assets/Tenx_logo.jpg";
import "../styles/header.css";

const Header = () => {
	const navigate = useNavigate();

	return (
		<header className='header'>
			<div className='container header-container'>
				<div className='logo-'>
					<img
						src={Tenxlogo}
						alt='Tenx logo'
						className='logo'
					/>
					<div className='logo-text'>
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
	);
};

export default Header;
