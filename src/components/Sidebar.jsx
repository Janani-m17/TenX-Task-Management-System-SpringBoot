import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tenxpage.css";
import Tenxlogo from "../assets/tenx logo.jpg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const menuItems = [
	{ icon: <MdDashboard />, label: "Dashboard", path: "/tenxpage" },
	{ icon: <FaTasks />, label: "My tasks", path: "/tasks" },
	{ icon: <BsBell />, label: "Notifications", path: "/notifications" },
	{ icon: <MdOutlineSettings />, label: "Settings", path: "/settings" },
	{ icon: <RiLogoutBoxRLine />, label: "Log out"},
];

function Sidebar({ selectedSection, onSectionSelect }) {
	const navigate = useNavigate();

    const handleNavigation = async (label, path) => {
		if (label === "Log out") {
			try {
				const token = localStorage.getItem("token");

				const response = await fetch("http://localhost:8080/auth/logout", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: token, 
					},
				});

				if (response.ok) {
					localStorage.removeItem("token"); 
					navigate("/login"); 
                    alert("Logged out successful!");
				} else {
					console.error("Logout failed");
				}
			} catch (error) {
				console.error("Error logging out:", error);
			}
		} else {
			onSectionSelect(label);
			navigate(path);
		}
	};

	return (
		<div className='sidebar'>
            <div className="logo1-">
            <img src={Tenxlogo} alt="Tenx logo" className="logo1" />
            <div className="logo-text1">
                <span>T</span>
                <span>e</span>
                <span>n</span>
                <span>X</span>
            </div>
            </div>
			<nav>
				{menuItems.map(item => (
					<div
						key={item.label}
						className={`sidebar-item ${
							selectedSection === item.label ? "selected" : ""
						}`}
						onClick={() => handleNavigation(item.label, item.path)}>
						<span className='sidebar-icon'>{item.icon}</span>
						<span className='sidebar-label'>{item.label}</span>
					</div>
				))}
			</nav>
		</div>
	);
}

export default Sidebar;