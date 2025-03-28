import React, { useEffect, useState } from "react";
import "../styles/tenxpage.css";
import { CheckCircle } from "lucide-react";
import { VscTasklist } from "react-icons/vsc";
import { checkTokenExpiration } from "../Auth";


const MyTasks = ({ selectedDate }) => {
    const [tasks, setTasks] = useState([]);

    // Function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.getFullYear() + "-" +
            String(today.getMonth() + 1).padStart(2, "0") + "-" +
            String(today.getDate()).padStart(2, "0");
    };

    // Use selectedDate if provided; otherwise, default to today's date
    const [currentDate, setCurrentDate] = useState(selectedDate || getTodayDate());

    useEffect(() => {
        if (selectedDate) {
            setCurrentDate(selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        console.log("Fetching tasks for date:", currentDate);
        fetchTasks(currentDate);
    }, [currentDate]);

    const fetchTasks = async (date) => {
        try {
            checkTokenExpiration();
            const response = await fetch(`http://localhost:8080/tasks/date/${date}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Authorization": `${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 403) {
                throw new Error("Access denied. Please check your authentication.");
            }

            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
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
            return data.taskId;  // Ensure correct property
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

            // Fetch full task details
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

            // Update only the completion status
            const updatedTask = {
                ...taskData, 
                completionStatus: !currentStatus, 
                completedPercentage: !currentStatus ? 100 : 0, 
            };

            // Send update request
            const updateResponse = await fetch(`http://localhost:8080/tasks/update/${taskId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            });

            if (!updateResponse.ok) throw new Error("Failed to update task");

            fetchTasks(currentDate); // ✅ Use `currentDate` instead of `selectedDate`
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className='my-tasks white-bg'>
            <div className='section-header'>
                <h3>Tasks created on {currentDate}</h3>
            </div>

            <div className='tasks-list'>
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div key={task.id ?? `task-${index}`} className={`task ${task.completionStatus ? "completed" : ""}`}>
                            <div className='task-info'>
                                <input 
                                    type="checkbox" 
                                    className="task-checkbox" 
                                    checked={task.completionStatus} 
                                    onChange={() => toggleComplete(task.id ?? task.taskId, task.name, task.completionStatus)} 
                                />
                                <span className='task-label'>{task.name}</span>
                            </div>
                            <div className={`task-status ${task.completionStatus ? "completed" : "in-progress"}`}>
                                <CheckCircle size={16} />
                                <span>{task.completionStatus ? "Completed" : "In Progress"}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tasks for this date</p>
                )}
            </div>
        </div>
    );
};

export default MyTasks;
