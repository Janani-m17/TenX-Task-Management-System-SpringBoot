import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tenxpage.css";
import Tenxlogo from "../assets/tenx logo.jpg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import sidebarimg from "../assets/sidebar.svg"
import { FaChartPie } from "react-icons/fa";
import { checkTokenExpiration } from "../Auth";

const menuItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/tenxpage" },
  { icon: <FaTasks />, label: "My tasks", path: "/tasks" },
  { icon: <FaChartPie />, label: "Categorize", path: "/categorize" },
];

function Sidebar({ selectedSection, onSectionSelect }) {
  const navigate = useNavigate();

  const handleNavigation = async (label, path) => {
    if (label === "Log out") {
      checkTokenExpiration();
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
          alert("Logged out successfully!");
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
    <div className="sidebar">
      {/* Logo Section */}
      <div className="logo1-">
        <img src={Tenxlogo} alt="Tenx logo" className="logo1" />
        <div className="logo-text1">
          <span>T</span>
          <span>e</span>
          <span>n</span>
          <span>X</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="menu-items">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`sidebar-item ${
              selectedSection === item.label ? "selected" : ""
            }`}
            onClick={() => handleNavigation(item.label, item.path)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </div>
        ))}
      </nav>

	  <div style={{ height: "100vh" }}>
			<img 
				src={sidebarimg} 
				alt="sidebar" 
				style={{ width: "90%", height: "100%", marginTop: "-10px" }} 
			/>
			</div>

      {/* Logout Button at Bottom */}
      <div className="logout-container">
        <div className="sidebar-item logout" onClick={() => handleNavigation("Log out")}>
          <span className="sidebar-icon"><RiLogoutBoxRLine /></span>
          <span className="sidebar-label">Log out</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
