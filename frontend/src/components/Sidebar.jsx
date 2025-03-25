import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tenxpage.css";

const menuItems = [
	{ icon: "📊", label: "Dashboard", path: "/tenxpage" },
	{ icon: "✅", label: "My tasks", path: "/tasks" },
	{ icon: "🔔", label: "Notifications", path: "/notifications" },
	{ icon: "⚙️", label: "Settings", path: "/settings" },
	{ icon: "🚪", label: "Log out", path: "/login" },
];

function Sidebar({ selectedSection, onSectionSelect }) {
	const navigate = useNavigate();

	const handleNavigation = (label, path) => {
		onSectionSelect(label);
		navigate(path);
	};

	return (
		<div className='sidebar'>
			<div className='logo'>Organizo</div>
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
