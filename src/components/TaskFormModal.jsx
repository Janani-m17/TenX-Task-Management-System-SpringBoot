import React, { useState } from "react";
import { IoClose, IoCalendar, IoPricetag } from "react-icons/io5";
import "../styles/modal.css";

const TaskFormModal = ({ isOpen, onClose }) => {
	const [taskName, setTaskName] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [category, setCategory] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	if (!isOpen) return null;

	const handlePrioritySelect = value => {
		setPriority(value === priority ? "" : value);
	};

	const handleClose = () => {
		setTaskName("");
		setDescription("");
		setPriority("");
		setCategory("");
		setDueDate("");
		setError(null);
		onClose();
	};

	const fetchTasks = async () => {
		try {
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
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
	
		const token = localStorage.getItem("token");
		if (!token) {
			setError("User not authenticated. Please log in.");
			setLoading(false);
			return;
		}
	
		// Validate Due Date
		const today = new Date().setHours(0, 0, 0, 0); // Get today's date without time
		const selectedDate = new Date(dueDate).setHours(0, 0, 0, 0); // Get selected date without time
	
		if (selectedDate < today) {
			setError("Please select a valid due date. It cannot be in the past.");
			setLoading(false);
			return;
		}
	
		const newTask = {
			name: taskName,
			description,
			priority,
			category,
			deadline: dueDate,
		};
	
		try {
			const response = await fetch("http://localhost:8080/tasks/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
				body: JSON.stringify(newTask),
			});
	
			if (response.ok) {
				const result = await response.json();
				console.log("Task Created:", result);
				fetchTasks();
				alert("Task created successfully!");
				handleClose();
			} else {
				const errorMsg = await response.text();
				setError(errorMsg || "Failed to create task");
			}
		} catch (error) {
			setError("Something went wrong. Please try again.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	

	return (
		<div
			className='modal-overlay'
			onClick={onClose}>
			<div
				className='modal-content'
				onClick={e => e.stopPropagation()}>
				<form onSubmit={handleSubmit}>
					{/* Header */}
					<div className='modal-header'>
						<input
							type='text'
							className='task-input'
							placeholder='Task Name'
							value={taskName}
							onChange={e => setTaskName(e.target.value)}
							required
						/>
						<IoClose
							className='close-icon'
							onClick={handleClose}
						/>
					</div>

					{/* Task Options */}
					<div className='task-options'>
						{/* Due Date */}
						<div className='option'>
							<IoCalendar />
							<span>Due Date:</span>
							<input
								type='date'
								value={dueDate}
								onChange={e => setDueDate(e.target.value)}
								required
							/>
						</div>

						{/* Priority */}
						<div className='option'>
							<IoPricetag />
							<span>Priority:</span>
							<div className='priority-buttons'>
								{["High", "Medium", "Low"].map(level => (
									<div
										key={level}
										className={`priority-btn ${
											priority === level ? "selected" : ""
										}`}
										onClick={() => handlePrioritySelect(level)}>
										{level}
										{priority === level && (
											<IoClose
												className='priority-close'
												onClick={e => {
													e.stopPropagation(); // Prevent parent div click event
													setPriority("");
												}}
											/>
										)}
									</div>
								))}
							</div>
						</div>

						{/* Tags */}
						<div className='option'>
							<IoPricetag />
							<span>Category:</span>
							<select
								value={category}
								onChange={e => setCategory(e.target.value)}
								required>
									<option value=''>Select a category</option>
									<option value='Work'>Work</option>
									<option value='Personal'>Personal</option>
									<option value='Shopping'>Health</option>
									<option value='Fitness'>Fitness</option>
									<option value='Learning'>Learning</option>
									<option value='others'>Others</option>
							</select>
						</div>
					</div>

					{/* Description */}
					<textarea
						className='description'
						placeholder='Description'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>

					{/* Error Message */}
					{error && <p className='error-message'>{error}</p>}

					{/* Footer */}
					<div className='modal-footer'>
						<button
							type='submit'
							className='create-btn'
							disabled={loading}>
							{loading ? "Creating..." : "Create Task"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TaskFormModal;