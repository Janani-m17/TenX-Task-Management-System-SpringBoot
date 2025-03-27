import React from "react";
import "../styles/tenxpage.css";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register required chart.js components
Chart.register(...registerables);

function MyTracking() {
	// Updated tracking items with dates
	const trackingItems = [
		{ label: "Create wireframe", time: "1h 25m 30s", date: "2024-08-05" },
		{ label: "Slack logo design", time: "30m 18s", date: "2024-08-06" },
		{ label: "Dashboard design", time: "1h 48m 22s", date: "2024-08-07" },
		{ label: "Create wireframe", time: "1m 15s", date: "2024-08-05" },
		{ label: "Mood tracker", time: "15m 5s", date: "2024-08-08" },
		{ label: "Bug fix", time: "25m 45s", date: "2024-08-06" },
	];

	// Helper function to get the day of the week (0 = Sunday, 1 = Monday, etc.)
	const getDayOfWeek = (dateString) => {
		const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const date = new Date(dateString);
		return days[date.getDay()];
	};

	// Count tasks per day of the week
	const taskCountsByDay = trackingItems.reduce((acc, item) => {
		const day = getDayOfWeek(item.date);
		acc[day] = (acc[day] || 0) + 1; // Increment task count
		return acc;
	}, {});

	// Ensure all days are present (even if 0 tasks)
	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const taskData = daysOfWeek.map((day) => taskCountsByDay[day] || 0);

	// Chart Data
	const chartData = {
		labels: daysOfWeek,
		datasets: [
			{
				label: "Tasks Completed",
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
					text: "Tasks Completed",
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
				<h3>My Tracking</h3>
			</div>

			{/* Bar Chart: Tasks Completed Per Day */}
			<div className='chart-container'>
				<Bar data={chartData} options={chartOptions} />
			</div>

			{/* Add Widget */}
			{/* <div className='add-tracking'>
				<span>+ Add widget</span>
			</div> */}
		</div>
	);
}

export default MyTracking;