import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/profile.css";
import { MdEdit } from "react-icons/md";


const ProfilePage = () => {
    const [selectedSection, setSelectedSection] = useState("Profile");
    const [fullName, setFullName] = useState("Janani");
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <div className='app-container'>
            <Sidebar selectedSection={selectedSection} onSectionSelect={setSelectedSection} />
            <div className='main-content profile-page'>
                <div className='profile-container'>
                    <h2>User Profile</h2>
                    <div className='profile-section'>
                        <label><strong>Name:</strong></label>
                        <div className='name-edit-container'>
                            {isEditing ? (
                                <input
                                    type='text'
                                    value={fullName}
                                    onChange={handleNameChange}
                                    onBlur={handleBlur}
                                    autoFocus
                                />
                            ) : (
                                <span>{fullName}</span>
                            )}
							<MdEdit className='edit-icon' onClick={handleEditClick} />
                        </div>
                    </div>
                    <div className='profile-section'>
                        <label><strong>Email:</strong></label>
                        <span>janani@gmail.com</span>
                    </div>
                    <div className='profile-section'>
                        <label><strong>Points:</strong></label>
                        <span>70</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;