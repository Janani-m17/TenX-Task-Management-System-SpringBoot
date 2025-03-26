import React, { useState } from "react";
import "../styles/tenxpage.css";
import Calendar from "react-calendar";
import MyTasks from "./MyTasks";
import MyCategories from "./MyCategories";
import MyTracking from "./MyTracking";
import Sidebar from "./Sidebar";

function SearchBar() {
	const [selectedSection, setSelectedSection] = useState("Dashboard");

	return (
		<div className='app-container'>
			<Sidebar
				selectedSection={selectedSection}
				onSectionSelect={setSelectedSection}
			/>
			<div className='main-content'>
				<div className='top-bar'>
					<input
						type='text'
						placeholder='Search'
						className='search-input'
					/>
					<div className='top-bar-actions'>
						<button className='new-task-btn'>+ New task</button>
						<div className='notification-icons'>
							<span>👤</span>
						</div>
					</div>
				</div>
				{/* <div className='dashboard-grid'>
					<Calendar />
					<MyTasks />
					<MyCategories />
					<MyTracking />
				</div> */}
			</div>
		</div>
	);
}

export default SearchBar;