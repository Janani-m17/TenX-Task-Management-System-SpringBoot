import React, { useState } from "react";
import Calendar from "../components/Calendar";
import MyTasks from "../components/MyTasks";
import MyCategories from "../components/MyCategories";
import MyTracking from "../components/MyTracking";
import TaskFormModal from "../components/TaskFormModal";
import "../styles/tenxpage.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const TenxPage = () => {
	const [selectedSection, setSelectedSection] = useState("Dashboard");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

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
						<button
							className='new-task-btn'
							onClick={() => setIsModalOpen(true)}>
							+ New task
						</button>
						<div className='notification-icons'>
							<span
								onClick={() => navigate("/profile")}
								style={{ cursor: "pointer" }}>
								👤
							</span>
						</div>
					</div>
				</div>
				<div className='dashboard-grid'>
					<div className='dashboard-left'>
						<Calendar />
						<MyCategories />
					</div>
					<div className='dashboard-right'>
						<MyTasks />
						<MyTracking />
					</div>
				</div>
			</div>
			<TaskFormModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
};

export default TenxPage;