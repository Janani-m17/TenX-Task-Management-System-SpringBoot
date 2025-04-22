import React, { useEffect, useState } from "react";
import "../styles/tenxpage.css";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { checkTokenExpiration } from "../Auth";

Chart.register(...registerables);

function MyTracking() {
	const [taskCountsByDay, setTaskCountsByDay] = useState({});

	// Get the day of the week from a date
	const getDayOfWeek = dateString => {
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const date = new Date(dateString);
		return days[date.getDay()];
	};

	// Fetch task data from API
	useEffect(() => {
		const fetchTasks = async () => {
			try {
				checkTokenExpiration();
				const response = await fetch("http://localhost:8080/tasks/last7days", {
					method: "GET",
					credentials: "include",
					headers: {
						Authorization: `${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`Error ${response.status}: ${response.statusText}`);
				}

				const tasks = await response.json();

				// Process tasks and group by day of the week
				const taskCounts = tasks.reduce((acc, task) => {
					if (task.dateOfCreation) {
						// Extract only the date part
						const dateOnly = task.dateOfCreation;
						const day = getDayOfWeek(dateOnly);
						acc[day] = (acc[day] || 0) + 1;
					}
					return acc;
				}, {});

				setTaskCountsByDay(taskCounts);
			} catch (error) {
				console.error("Error fetching tasks:", error);
			}
		};

		fetchTasks();
	}, []);

	// Ensure all days are present (even if 0 tasks)
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const taskData = daysOfWeek.map(day => taskCountsByDay[day] || 0);

	// Chart Data
	const chartData = {
		labels: daysOfWeek,
		datasets: [
			{
				label: "Tasks Created",
				data: taskData,
				backgroundColor: "#5a4abf",
				borderRadius: 5,
			},
		],
	};

	// Chart Options
	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "top",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: "Tasks Created",
				},
				ticks: {
					stepSize: 1, // Ensure whole numbers on the y-axis
				},
			},
			x: {
				title: {
					display: true,
					text: "Day of the Week",
				},
			},
		},
	};

	return (
		<div className='my-tracking white-bg'>
			<div className='section-header'>
				<h3>Task Traffic</h3>
			</div>

			{/* Bar Chart: Tasks Created Per Day */}
			<div className='chart-container'>
				<Bar
					data={chartData}
					options={chartOptions}
				/>
			</div>
		</div>
	);
}

export default MyTracking;
