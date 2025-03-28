import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import "../styles/mytasks.css";
import { useNavigate } from "react-router-dom";
import TaskFormModal from "./TaskFormModal";
import { MdOutlineDoneOutline } from "react-icons/md";
import EditTaskModal from "./EditTaskModal";
import Head from "./Head";
import { checkTokenExpiration } from "../Auth";

const TasksPage = () => {
	const [selectedSection, setSelectedSection] = useState("My tasks");
	const [completedTasks, setCompletedTasks] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tasks, setTasks] = useState({ today: [], tomorrow: [], thisWeek: [] });
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [taskToEdit, setTaskToEdit] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			checkTokenExpiration();
			const response = await fetch("http://localhost:8080/tasks/my", {
				method: "GET",
				credentials: "include",
				headers: {
					Authorization: `${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) throw new Error("Failed to fetch tasks");

			const data = await response.json();
			categorizeTasks(data);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	const categorizeTasks = (tasks) => {
		const today = [];
		const tomorrow = [];
		const thisWeek = [];

		const currentDate = new Date();
		const todayStr = currentDate.getFullYear() +
			"-" + String(currentDate.getMonth() + 1).padStart(2, "0") +
			"-" + String(currentDate.getDate()).padStart(2, "0");

		const tomorrowDate = new Date(currentDate);
		tomorrowDate.setDate(currentDate.getDate() + 1);
		const tomorrowStr = tomorrowDate.getFullYear() +
		"-" + String(tomorrowDate.getMonth() + 1).padStart(2, "0") +
		"-" + String(tomorrowDate.getDate()).padStart(2, "0");

		tasks.forEach((task) => {
			const taskDate = new Date(task.deadline);

			const formatTaskDate = taskDate.getFullYear() +
				"-" + String(taskDate.getMonth() + 1).padStart(2, "0") +
				"-" + String(taskDate.getDate()).padStart(2, "0");

			if (formatTaskDate === todayStr) {
				today.push(task);
			} else if (formatTaskDate === tomorrowStr) {
				tomorrow.push(task);
			} else {
				thisWeek.push(task);
			}
		});

		setTasks({ today, tomorrow, thisWeek });
	};

	const getTaskIdByName = async (taskName) => {
		try {
			checkTokenExpiration();
			const response = await fetch(`http://localhost:8080/tasks/id/${taskName}`, {
				method: "GET",
				credentials: "include",
				headers: {
					Authorization: `${localStorage.getItem("token")}`,
				},
			});
	
			if (!response.ok) throw new Error("Task not found");
			
			const data = await response.json();
			return data.taskId;  // Make sure to extract "taskId"
		} catch (error) {
			console.error("Error fetching task ID:", error);
			return null;
		}
	};
	

	const toggleComplete = async (taskId, taskName, currentStatus) => {
		try {
			if (!taskId) {
				console.warn(`taskId is undefined, fetching for task: ${taskName}`);
				taskId = await getTaskIdByName(taskName);
				if (!taskId) {
					console.error("Error: Could not retrieve taskId");
					return;
				}
			}

			checkTokenExpiration();
	
			// Fetch the full task details first
			const taskResponse = await fetch(`http://localhost:8080/tasks/${taskId}`, {
				method: "GET",
				credentials: "include",
				headers: {
					Authorization: `${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			});
	
			if (!taskResponse.ok) throw new Error("Failed to fetch task details");
	
			const taskData = await taskResponse.json();
	
			// Update only the completion status & set completed percentage to 100
			const updatedTask = {
				...taskData, // Keep all other values unchanged
				completionStatus: !currentStatus, // Toggle status
				completedPercentage: !currentStatus ? 100 : 0, // Set to 100 if true, else 0
			};
	
			// Send updated data
			const updateResponse = await fetch(`http://localhost:8080/tasks/update/${taskId}`, {
				method: "PUT",
				credentials: "include",
				headers: {
					Authorization: `${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedTask), // Send the full task object
			});
	
			if (!updateResponse.ok) throw new Error("Failed to update task");
	
			fetchTasks(); // Refresh task list
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};
	
	
	

	const editTask = task => {
		setTaskToEdit(task);
		setIsEditModalOpen(true);
	};

	const deleteTask = async (taskId) => {
		const isConfirmed = window.confirm("Are you sure you want to delete this task?");
		if (!isConfirmed) return; // If user cancels, do nothing

		checkTokenExpiration();
	
		try {
			const response = await fetch(`http://localhost:8080/tasks/delete/${taskId}`, {
				method: "DELETE",
				credentials: "include",
				headers: {
					Authorization: `${localStorage.getItem("token")}`,
				},
			});
	
			if (!response.ok) throw new Error("Failed to delete task");
	
			alert("Task deleted successfully!"); // Show success message
			fetchTasks(); // Refresh task list
		} catch (error) {
			console.error("Error deleting task:", error);
			alert("Failed to delete the task. Please try again.");
		}
	};
	
	

	return (
		<div className="tasks-page">
			<Sidebar selectedSection={selectedSection} onSectionSelect={setSelectedSection} />
			<div className="cat-container"> 
			<div className="tasks-content">
				{/* <div className="tasks-header">
					<p className='quote-text'>
						From To-Do to Done – <span className="highlight">TenX Gets You There!</span>
					</p>
					<div className="header-actions">
						<button className="new-task-btn" onClick={() => setIsModalOpen(true)}>+ New task</button>
						<div className="user-profile">
							<span onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>👤</span>
						</div>
					</div>
				</div> */}
				<Head />
				<div className="tasks-list-container">
					<TaskList title="Today" tasks={tasks.today} toggleComplete={toggleComplete} completedTasks={completedTasks} editTask={editTask} deleteTask={deleteTask} />
					<TaskList title="Tomorrow" tasks={tasks.tomorrow} toggleComplete={toggleComplete} completedTasks={completedTasks} editTask={editTask} deleteTask={deleteTask} />
					<TaskList title="This Week" tasks={tasks.thisWeek} toggleComplete={toggleComplete} completedTasks={completedTasks} editTask={editTask} deleteTask={deleteTask} />
				</div>
			</div>
			{/* <TaskFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
			<TaskFormModal 
				isOpen={isModalOpen} 
				onClose={() => setIsModalOpen(false)} 
				// fetchTasks={fetchTasks} // Pass fetchTasks function
			/>
			{isEditModalOpen && (
				<EditTaskModal
					isOpen={isEditModalOpen}
					onClose={() => setIsEditModalOpen(false)}
					task={taskToEdit}
					fetchTasks={fetchTasks} // To refresh after editing
				/>
			)}
		</div>
		</div>
	);
};

const TaskList = ({ tasks, title, toggleComplete, completedTasks, editTask, deleteTask }) => {

	const formatDate = (dateString) => {
		if (!dateString) return "No Due Date";
		
		const options = { year: "numeric", month: "short", day: "numeric" }; // Example: "Mar 25, 2025"
		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	const getDeadlineClass = (dateString) => {
		if (!dateString) return "";
		
		const taskDate = new Date(dateString);
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Normalize today’s date
	
		if (taskDate < today) return "past"; // Overdue tasks
		if (taskDate.toDateString() === today.toDateString()) return "today"; // Today’s tasks
		return "upcoming"; // Future tasks
	};
	

	return (
		<div className="task-section">
			<h3 className="section-title">{title}</h3>
			<div className="task-table">
				<div className="task-table-header">
					<span>Task</span>
					<span>Due Date</span>
					<span>Category</span> {/* New column for category */}
					<span>Stage</span> {/* Shows "In Progress" or "Completed" */}
					<span>Priority</span>
				</div>
				{tasks.length > 0 ? (
					tasks.map((task) => (
						<div key={task.taskId || task.id} className="task-row">
							<input 
								type="checkbox" 
								className="task-checkbox" 
								checked={task.completionStatus} 
								onChange={() => toggleComplete(task.taskId || task.id, task.name, task.completionStatus)} 
							/>
							<span className={`task-title ${task.completionStatus ? "completed" : ""}`}>
								{task.name}
							</span>
							<span className={`task-date ${getDeadlineClass(task.deadline)} ${task.completionStatus ? "completed" : ""}`}>
								{formatDate(task.deadline)}
							</span>

							{/* Category Column */}
							<span className={`task-category ${task.completionStatus ? "completed" : ""}`}>{task.category || "Uncategorized"}</span>

							{/* Stage Column - In Progress or Completed */}
							<span className={`task-stage ${task.completionStatus ? "completed" : ""}`}>
								{task.completionStatus ? "Completed" : "In Progress"}
							</span>

							{/* Priority Column */}
							<span className={`task-priority ${task.priority ? task.priority.toLowerCase() :"" } ${task.completionStatus ? "completed" : ""}`}>
    								{task.priority ? task.priority.toLowerCase() : "No Priority"}
							</span>

							{/* Actions */}
							<div className="task-actions">
								{!task.completionStatus && ( // Only show the edit button if the task is not completed
									<FaEdit className="edit-icon" onClick={() => editTask(task)} />
								)}
								{task.completionStatus && ( // Only show the delete button if the task is completed
									<MdOutlineDoneOutline />
								)}
								<FaTrash className="delete-icon" onClick={() => deleteTask(task.taskId || task.id)} />
							</div>

						</div>
					))
				) : (
					<p>No tasks available</p>
				)}
			</div>
		</div>
	);
};

export default TasksPage;
