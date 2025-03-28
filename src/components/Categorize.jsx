import React, { useState, useEffect } from "react";
import "../styles/progress.css";
import Sidebar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";

const TaskManagement = () => {
  const [selectedSection, setSelectedSection] = useState("Categorize");
  const [sortOption, setSortOption] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    const fetchTasks = async () => {
        try {
          let url = "http://localhost:8080/tasks/sorted/priority";
          if (sortOption === "priority") url = "http://localhost:8080/tasks/sorted/priority";
          else if (sortOption === "dueDate") url = "http://localhost:8080/tasks/sorted/due-date";
          else if (sortOption === "priorityDueDate") url = "http://localhost:8080/tasks/sorted/priority-due-date";
          else if (sortOption === "completed") url = "http://localhost:8080/tasks/completed";
          else if (sortOption === "inProgress") url = "http://localhost:8080/tasks/in-progress";
      
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`, // Ensure Bearer token is sent
            },
          });
      
          const data = await response.json();
          setTasks(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          setLoading(false);
        }
      };

    fetchTasks();
  }, [sortOption]);

  return (
    <div className='viewtasks-wrapper'>
      <Sidebar selectedSection={selectedSection} onSectionSelect={setSelectedSection} />
      <div className="cat-container">
      <div className="tasks-header">
					<p className='quote-text1'>
						From To-Do to Done – <span className="highlight">TenX Gets You There!</span>
					</p>
					<div className="header-actions">
						<button className="new-task-btn1" onClick={() => setIsModalOpen(true)}>+ New task</button>
						<div className="user-profile1">
							<span onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>👤</span>
						</div>
                </div>
            </div>
      <div className='viewtasks-container'>
        <div className='task-controls'>
          <select onChange={(e) => setSortOption(e.target.value)} className='task-sort'>
            <option value=''>Sort by</option>
            <option value='priority'>Priority</option>
            <option value='dueDate'>Due Date</option>
            <option value='priorityDueDate'>Priority & Due Date</option>
            <option value='completed'>Completed</option>
            <option value='inProgress'>In Progress</option>
          </select>
        </div>

        <div className='viewtasks-header'>
          <div>Task</div>
          <div>Due Date</div>
          <div>Category</div>
          <div>Status</div>
          <div>Priority</div>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          tasks.map((task) => (
            <div key={task.taskId} className='viewtasks-row'>
              <div>{task.name}</div>
              <div>{new Date(task.deadline).toLocaleDateString()}</div>
              <div>{task.category}</div>
              <div>
                    <span className={`task-stage-badge task-state-${task.completionStatus ? "completed" : "in-progress"}`}>
                        {task.completionStatus ? "Completed" : "In Progress"}
                    </span>
              </div>
              <div>
                <span className={`task-priority-badge task-priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default TaskManagement;
