import React, { useState } from "react";
import {
	IoClose,
	IoCalendar,
	IoPricetag,
} from "react-icons/io5";
import "../styles/modal.css";

const TaskFormModal = ({ isOpen, onClose }) => {
	const [taskName, setTaskName] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [tags, setTags] = useState([]);
	const [dueDate, setDueDate] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	if (!isOpen) return null;

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const token = localStorage.getItem("token"); // Get JWT token from localStorage
		if (!token) {
			setError("User not authenticated. Please log in.");
			setLoading(false);
			return;
		}

		const newTask = {
			name: taskName,
			description,
			priority,
			category: tags.join(", "), // Convert array to string
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
				alert("Task created successfully!");
				onClose(); // Close modal after success
			} else {
				const errorMsg = await response.text();
				setError(errorMsg || "Failed to create task");
			}
		} catch (error) {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
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
						<IoClose className='close-icon' onClick={onClose} />
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
							<button type='button' onClick={() => setPriority("High")}>High</button>
							<button type='button' onClick={() => setPriority("Medium")}>Medium</button>
							<button type='button' onClick={() => setPriority("Low")}>Low</button>
						</div>

						{/* Tags */}
						<div className='option'>
							<IoPricetag />
							<span>Category:</span>
							<input
								type='text'
								placeholder='Add tags (comma-separated)'
								value={tags.join(", ")}
								onChange={e => setTags(e.target.value.split(","))}
							/>
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
						<button type='submit' className='create-btn' disabled={loading}>
							{loading ? "Creating..." : "Create Task"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TaskFormModal;
