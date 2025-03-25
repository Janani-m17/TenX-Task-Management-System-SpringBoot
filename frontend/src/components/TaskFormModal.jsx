import React, { useState } from "react";
import {
	IoClose,
	IoCalendar,
	IoNotifications,
	IoPerson,
	IoPricetag,
} from "react-icons/io5";
import "../styles/modal.css";

const TaskFormModal = ({ isOpen, onClose }) => {
	const [taskName, setTaskName] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [tags, setTags] = useState([]);
	const [dueDate, setDueDate] = useState("");
	const [notification, setNotification] = useState("");

	if (!isOpen) return null;

	const handleSubmit = e => {
		e.preventDefault();

		const newTask = {
			taskName,
			description,
			priority,
			tags,
			dueDate,
			notification,
		};
		console.log("Task Created:", newTask);
		onClose(); // Close modal after submission
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
							onClick={onClose}
						/>
					</div>

					{/* Task Options */}
					<div className='task-options'>
						{/* Due Date */}
						<div className='option'>
							<IoCalendar />
							<span>Due Date:</span>
							<button
								type='button'
								onClick={() => setDueDate("Today")}>
								Today
							</button>
							<button
								type='button'
								onClick={() => setDueDate("Tomorrow")}>
								Tomorrow
							</button>
						</div>

						{/* Notification */}
						<div className='option'>
							<IoNotifications />
							<span>Notification:</span>
							<button
								type='button'
								onClick={() => setNotification("In 1 hour")}>
								In 1 hour
							</button>
						</div>

						{/* Priority */}
						<div className='option'>
							<IoPricetag />
							<span>Priority:</span>
							<button
								type='button'
								onClick={() => setPriority("High")}>
								High
							</button>
							<button
								type='button'
								onClick={() => setPriority("Medium")}>
								Medium
							</button>
							<button
								type='button'
								onClick={() => setPriority("Low")}>
								Low
							</button>
						</div>

						{/* Tags */}
						<div className='option'>
							<IoPricetag />
							<span>Tags:</span>
							<input
								type='text'
								placeholder='Add tags (comma separated)'
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

					{/* Footer */}
					<div className='modal-footer'>
						<button
							type='submit'
							className='create-btn'>
							Create Task
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TaskFormModal;
