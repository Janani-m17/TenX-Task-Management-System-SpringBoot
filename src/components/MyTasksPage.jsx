import React, { useState } from "react";
import Sidebar from "./SideBar";
import "../styles/mytasks.css";

const tasksData = {
	today: [
		{
			id: 1,
			title: "Finish monthly reporting",
			dueDate: "Today",
			stage: "in-progress",
			priority: "High",
		},
		{
			id: 2,
			title: "Contract signing",
			dueDate: "Today",
			stage: "in-progress",
			priority: "Medium",
		},
		{
			id: 3,
			title: "Market overview keynote",
			dueDate: "Today",
			stage: "in-progress",
			priority: "High",
		},
	],
	tomorrow: [
		{
			id: 4,
			title: "Brand proposal",
			dueDate: "Tomorrow",
			stage: "not-started",
			priority: "High",
		},
		{
			id: 5,
			title: "Social media review",
			dueDate: "Tomorrow",
			stage: "in-progress",
			priority: "Medium",
		},
		{
			id: 6,
			title: "Report - Week 30",
			dueDate: "Tomorrow",
			stage: "not-started",
			priority: "Low",
		},
	],
	thisWeek: [
		{
			id: 7,
			title: "Order check-ins",
			dueDate: "Wednesday",
			stage: "in-progress",
			priority: "Medium",
		},
		{
			id: 8,
			title: "HR reviews",
			dueDate: "Wednesday",
			stage: "not-started",
			priority: "Medium",
		},
		{
			id: 9,
			title: "Report - Week 30",
			dueDate: "Friday",
			stage: "not-started",
			priority: "Low",
		},
	],
};

const TaskList = ({ tasks, title, toggleComplete, completedTasks }) => {
	return (
		<div className='task-section'>
			<h3 className='section-title'>{title}</h3>
			<div className='task-table'>
				<div className='task-table-header'>
					<span>Task</span>
					<span>Due Date</span>
					<span>Stage</span>
					<span>Priority</span>
				</div>
				{tasks.map(task => (
					<div
						key={task.id}
						className='task-row'>
						<input
							type='checkbox'
							className='task-checkbox'
							checked={completedTasks.includes(task.id)}
							onChange={() => toggleComplete(task.id)}
						/>
						<span
							className={`task-title ${
								completedTasks.includes(task.id) ? "completed" : ""
							}`}>
							{task.title}
						</span>
						<span className='task-date'>{task.dueDate}</span>
						<span className={`task-stage ${task.stage.replace(" ", "-")}`}>
							{task.stage}
						</span>
						<span className={`task-priority ${task.priority.toLowerCase()}`}>
							{task.priority}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const TasksPage = () => {
	const [selectedSection, setSelectedSection] = useState("My tasks");
	const [completedTasks, setCompletedTasks] = useState([]);

	const toggleComplete = taskId => {
		setCompletedTasks(prev =>
			prev.includes(taskId)
				? prev.filter(id => id !== taskId)
				: [...prev, taskId]
		);
	};

	return (
		<div className='tasks-page'>
			<Sidebar
				selectedSection={selectedSection}
				onSectionSelect={setSelectedSection}
			/>
			<div className='tasks-content'>
				<div className='tasks-header'>
					<input
						type='text'
						placeholder='Search'
						className='search-input'
					/>
					<div className='header-actions'>
						<button className='new-task-btn'>+ New task</button>
						<div className='user-profile'>👤</div>
					</div>
				</div>
				<div className='tasks-list-container'>
					<TaskList
						title='Today'
						tasks={tasksData.today}
						toggleComplete={toggleComplete}
						completedTasks={completedTasks}
					/>
					<TaskList
						title='Tomorrow'
						tasks={tasksData.tomorrow}
						toggleComplete={toggleComplete}
						completedTasks={completedTasks}
					/>
					<TaskList
						title='This Week'
						tasks={tasksData.thisWeek}
						toggleComplete={toggleComplete}
						completedTasks={completedTasks}
					/>
				</div>
			</div>
		</div>
	);
};

export default TasksPage;