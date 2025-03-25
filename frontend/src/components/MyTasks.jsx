import React from "react";
import "../styles/tenxpage.css";

const MyTasks = () => {
	const tasks = [
		{ id: 1, label: "Design team meeting", completed: false },
		{ id: 2, label: "Review project proposal", completed: true },
		{ id: 3, label: "Update marketing strategy", completed: false },
	];

	return (
		<div className='my-tasks white-bg'>
			<div className='section-header'>
				<h3>Tasks</h3>
			</div>

			<div className='tasks-list'>
				{tasks.map(task => (
					<div
						key={task.id}
						className={`task ${task.completed ? "completed" : ""}`}>
						<input
							type='checkbox'
							className='task-checkbox'
							checked={task.completed}
							readOnly
						/>
						<span className='task-label'>{task.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyTasks;
