import React, { useState } from "react";
import "../styles/progress.css";
import Sidebar from "../components/Sidebar.jsx";

const TaskManagement = () => {
	const [selectedSection, setSelectedSection] = useState("My tasks");
	const [sortOption, setSortOption] = useState("");

	const tasks = [
		{
			id: 1,
			task: "Exam preparation",
			dueDate: "2025-03-29",
			category: "College",
			stage: "In Progress",
			priority: "Medium",
		},
		{
			id: 2,
			task: "Check 1",
			dueDate: "2025-03-30",
			category: "Learning",
			stage: "In Progress",
			priority: "Medium",
		},
		{
			id: 3,
			task: "Check 2",
			dueDate: "2025-03-31",
			category: "Personal",
			stage: "In Progress",
			priority: "Low",
		},
		{
			id: 4,
			task: "Check 3",
			dueDate: "2025-03-29",
			category: "Fitness",
			stage: "In Progress",
			priority: "Medium",
		},
		{
			id: 4,
			task: "Check 3",
			dueDate: "2025-03-29",
			category: "Fitness",
			stage: "In Progress",
			priority: "Medium",
		},
		{
			id: 4,
			task: "Check 3",
			dueDate: "2025-03-29",
			category: "Fitness",
			stage: "In Progress",
			priority: "Medium",
		},
		{
			id: 4,
			task: "Check 3",
			dueDate: "2025-03-29",
			category: "Fitness",
			stage: "In Progress",
			priority: "Medium",
		},
		{
			id: 4,
			task: "Check 3",
			dueDate: "2025-03-29",
			category: "Fitness",
			stage: "In Progress",
			priority: "Medium",
		},
		{
			id: 4,
			task: "Check 3",
			dueDate: "2025-03-29",
			category: "Fitness",
			stage: "In Progress",
			priority: "Medium",
		},
	];

	// Sorting logic
	const sortedTasks = [...tasks].sort((a, b) => {
		if (sortOption === "priority") {
			const priorityOrder = { High: 1, Medium: 2, Low: 3 };
			return priorityOrder[a.priority] - priorityOrder[b.priority];
		} else if (sortOption === "dueDate") {
			return new Date(a.dueDate) - new Date(b.dueDate);
		} else if (sortOption === "stage") {
			return a.stage.localeCompare(b.stage);
		}
		return 0;
	});

	return (
		<div className='viewtasks-wrapper'>
			<Sidebar
				selectedSection={selectedSection}
				onSectionSelect={setSelectedSection}
			/>

			<div className='viewtasks-container'>
				{/* Sorting Controls */}
				<div className='task-controls'>
					<select
						onChange={e => setSortOption(e.target.value)}
						className='task-sort'>
						<option value=''>Sort by</option>
						<option value='priority'>Priority</option>
						<option value='dueDate'>Due Date</option>
						<option value='stage'>Status</option>
					</select>
				</div>

				{/* Tasks Header */}
				<div className='viewtasks-header'>
					<div>Task</div>
					<div>Due Date</div>
					<div>Category</div>
					<div>Stage</div>
					<div>Priority</div>
				</div>

				{/* Tasks List */}
				{sortedTasks.map(task => (
					<div
						key={task.id}
						className='viewtasks-row'>
						<div>{task.task}</div>
						<div>{task.dueDate}</div>
						<div>{task.category}</div>
						<div>
							<span className='task-stage-badge'>{task.stage}</span>
						</div>
						<div>
							<span
								className={`task-priority-badge task-priority-${task.priority.toLowerCase()}`}>
								{task.priority}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TaskManagement;