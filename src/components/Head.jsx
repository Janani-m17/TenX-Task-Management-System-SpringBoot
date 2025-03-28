import React, { useState } from "react";
import TaskFormModal from "./TaskFormModal";
import { useNavigate } from "react-router-dom";

const Head = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="tasks-header">
			<p className='quote-text'>
				From To-Do to Done – <span className="highlight">TenX Gets You There!</span>
			</p>
			<div className="header-actions">
			<button className="new-task-btn" onClick={() => setIsModalOpen(true)}>+ New task</button>
			<div className="user-profile">
				<span onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>👤</span>
			</div>
            <TaskFormModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
		</div>
    );
};

export default Head;