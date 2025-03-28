import React from "react";

const Head = () => {
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
		</div>
		</div>
    );
};

export default Head;