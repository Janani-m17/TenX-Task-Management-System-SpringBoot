import React from "react";
import "../styles/tenxpage.css";

const menuItems = [
	{ icon: "📊", label: "Dashboard" },
	{ icon: "✅", label: "My tasks" },
	{ icon: "🔔", label: "Notifications" },
	{ icon: "⚙️", label: "Settings" },
	{ icon: "🚪", label: "Log out" },
];

function Sidebar({ selectedSection, onSectionSelect }) {
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
						onClick={() => onSectionSelect(item.label)}>
						<span className='sidebar-icon'>{item.icon}</span>
						<span className='sidebar-label'>{item.label}</span>
					</div>
				))}
			</nav>
		</div>
	);
}

export default Sidebar;
