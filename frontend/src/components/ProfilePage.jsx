import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/profile.css";

const ProfilePage = () => {
	const [selectedSection, setSelectedSection] = useState("Profile");
	const [profilePhoto, setProfilePhoto] = useState("/api/placeholder/200/200");
	const [fullName, setFullName] = useState("");
	// const [email, setEmail] = useState("john.deere@gmail.com");

	const handlePhotoUpload = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePhoto(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='app-container'>
			<Sidebar
				selectedSection={selectedSection}
				onSectionSelect={setSelectedSection}
			/>
			<div className='main-content profile-page'>
				<div className='profile-container'>
					<h2>Profile</h2>

					<div className='profile-section'>
						<h3>Profile photo</h3>
						<div className='profile-photo-wrapper'>
							<img
								src={profilePhoto}
								alt='Profile'
								className='profile-photo'
							/>
							<label className='upload-photo-btn'>
								+ Upload photo
								<input
									type='file'
									accept='.jpg,.jpeg,.gif,.png'
									style={{ display: "none" }}
									onChange={handlePhotoUpload}
								/>
							</label>
							<p className='photo-upload-info'>
								Supported formats: jpg, gif or png. Max file size 500k.
							</p>
						</div>
					</div>

					<div className='profile-section'>
						<h3>Contact</h3>
						<div className='input-group'>
							<label>Full name*</label>
							<input
								type='text'
								placeholder='Type your name here'
								value={fullName}
								onChange={e => setFullName(e.target.value)}
							/>
						</div>
						<div className='input-group'>
							<label>Email address</label>
							{/* <input
								type='email'
								value={email}
								readOnly
							/> */}
							<button className='change-email-btn'>Change email address</button>
						</div>
					</div>

					<div className='profile-actions'>
						<button className='cancel-btn'>Cancel</button>
						<button className='save-changes-btn'>Save changes</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
