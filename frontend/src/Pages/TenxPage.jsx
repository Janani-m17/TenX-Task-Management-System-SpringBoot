import React, { useState } from "react";
import Calendar from "../components/Calendar";
import MyTasks from "../components/MyTasks";
import MyCategories from "../components/MyCategories";
import MyTracking from "../components/MyTracking";
import TaskFormModal from "../components/TaskFormModal";
import "../styles/tenxpage.css";
import Sidebar from "../components/Sidebar";
import Head from "../components/Head";

const TenxPage = () => {
	const [selectedSection, setSelectedSection] = useState("Dashboard");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);

	return (
		<div className='app-container'>
			<Sidebar
				selectedSection={selectedSection}
				onSectionSelect={setSelectedSection}
			/>
			<div className='cat-container'>
				<div className='main-content'>
					<Head />
					<div className='dashboard-grid'>
						<div className='dashboard-left'>
							<Calendar onDateSelect={setSelectedDate} />
							<MyCategories />
						</div>
						<div className='dashboard-right'>
							<MyTasks selectedDate={selectedDate} />
							<MyTracking />
						</div>
					</div>
				</div>
				<TaskFormModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			</div>
		</div>
	);
};

export default TenxPage;
