import React, { useState, useEffect } from "react";
import { IoClose, IoCalendar, IoPricetag } from "react-icons/io5";
import "../styles/modal.css";
import { checkTokenExpiration } from "../Auth";

const EditTaskModal = ({
	isOpen,
	onClose,
	task, // The specific task to be edited
	fetchTasks,
}) => {
	const [taskName, setTaskName] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [category, setCategory] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Effect to populate form when the modal opens
	useEffect(() => {
		if (task) {
			setTaskName(task.name || "");
			setDescription(task.description || "");
			setPriority(task.priority || "");
			setCategory(task.category || "");

			// Format date for input
			const formattedDate = task.deadline
				? new Date(task.deadline).toISOString().split("T")[0]
				: "";
			setDueDate(formattedDate);
		}
	}, [task]);

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

	const handleSubmit = async e => {
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
		const today = new Date().setHours(0, 0, 0, 0);
		const selectedDate = new Date(dueDate).setHours(0, 0, 0, 0);

		if (selectedDate < today) {
			setError("Please select a valid due date. It cannot be in the past.");
			setLoading(false);
			return;
		}

		try {
			checkTokenExpiration();
			const response = await fetch(
				`http://localhost:8080/tasks/update/${task.taskId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
					body: JSON.stringify({
						...task, // Spread existing task properties
						name: taskName,
						description,
						priority,
						category,
						deadline: dueDate,
					}),
				}
			);

			if (response.ok) {
				const result = await response.json();
				console.log("Task Updated:", result);

				// Only call fetchTasks if it's provided
				if (fetchTasks && typeof fetchTasks === "function") {
					fetchTasks();
				}

				alert("Task updated successfully!");
				handleClose();
			} else {
				const errorMsg = await response.text();
				setError(errorMsg || "Failed to update task");
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
													e.stopPropagation();
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
								<option value='Health'>Health</option>
								<option value='Fitness'>Fitness</option>
								<option value='Learning'>Learning</option>
								<option value='Others'>Others</option>
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
							{loading ? "Updating..." : "Update Task"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditTaskModal;
