import React, { useState, useEffect } from "react";
import { Edit, Save, User, CheckCircle, TrendingUp, Trophy } from "lucide-react";
import SideBar from "../components/Sidebar";
import "../styles/profile.css";
import profileimg from "../assets/profile.svg"

const ProfilePage = () => {
  // User details state
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    bio: "Software Engineer passionate about productivity",
    location: "San Francisco, CA",
  });

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Profile");

  // Task statistics state
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    efficiency: 0,
    points : 0,
  });

  // Fetch user details on mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/user-info", {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUserDetails((prev) => ({
          ...prev,
          name: data.name,
          email: data.email,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchTaskStats = async () => {
      try {
        const response = await fetch("http://localhost:8080/tasks/stats", {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch task statistics");
        }

        const data = await response.json();
        setTaskStats({
          totalTasks: data.totalTasks,
          completedTasks: data.completedTasks,
          efficiency: data.totalTasks > 0 ? ((data.completedTasks / data.totalTasks) * 100).toFixed(1) : 0,
          points: data.completedTasks * 10, // Placeholder for now
        });
      } catch (error) {
        console.error("Error fetching task statistics:", error);
      }
    };

    fetchUserInfo();
    fetchTaskStats();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      saveUserDetails();
    }
    setIsEditing(!isEditing);
  };

  // Save user details to backend
  const saveUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/updateUser", {
        method: "PUT",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userDetails.name,
          email: userDetails.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Component */}
      <SideBar selectedSection={selectedSection} onSectionSelect={setSelectedSection} />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Profile Content */}
        <div className="profile-content">
          <div className="profile-card">
            {/* Profile Header */}
            <div className="profile-header">
              <div className="profile-header-content">
                <div className="profile-avatar">
                  <User className="avatar-placeholder" />
                </div>
                <div className="profile-details">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        className={`edit-input name-input ${isEditing ? "highlighted" : ""}`}
                      />
                      <input
                        type="text"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        className={`edit-input email-input ${isEditing ? "highlighted" : ""}`}
                      />
                    </>
                  ) : (
                    <>
                      <h1 className="profile-name">{userDetails.name}</h1>
                      <p className="profile-email">{userDetails.email}</p>
                    </>
                  )}
                </div>
              </div>
              <button onClick={toggleEditMode} className="edit-toggle-button">
                {isEditing ? <Save className="button-icon" /> : <Edit className="button-icon" />}
              </button>
            </div>

            {/* Task Statistics */}
            <div className="task-statistics">
              {Object.entries(taskStats).map(([key, value]) => (
                <div key={key} className="stat-block">
                  <div className="stat-icon">
                    {key === "totalTasks" && <CheckCircle />}
                    {key === "completedTasks" && <CheckCircle />}
                    {key === "efficiency" && <TrendingUp />}
                    {key === "points" && <Trophy />}
                  </div>
                  <div className="stat-content">
                    <div className="stat-title">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </div>
                    <div className="stat-value">
                      {key === "efficiency" ? `${value}%` : value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div> <img src={profileimg} style={}/> </div> */}
    </div>
  );
};

export default ProfilePage;
