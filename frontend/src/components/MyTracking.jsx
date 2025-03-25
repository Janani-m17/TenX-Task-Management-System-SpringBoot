import React from "react";
import "../styles/tenxpage.css";

function MyTracking() {
	// const [isTracking, setIsTracking] = useState(false);

	const trackingItems = [
		{ label: "Create wireframe", time: "1h 25m 30s" },
		{ label: "Slack logo design", time: "30m 18s" },
		{ label: "Dashboard design", time: "1h 48m 22s" },
		{ label: "Create wireframe", time: "1m 15s" },
		{ label: "Mood tracker", time: "15m 5m 58s" },
	];

	// const toggleTracking = () => {
	// 	setIsTracking(!isTracking);
	// };

	return (
		<div className='my-tracking white-bg'>
			<div className='section-header'>
				<h3>My tracking</h3>
				<span>...</span>
			</div>
			<div className='tracking-list'>
				{trackingItems.map((item, index) => (
					<div
						key={index}
						className='tracking-item'>
						<span className='tracking-label'>{item.label}</span>
						<div className='tracking-actions'>
							<span className='tracking-time'>{item.time}</span>
							<button className='tracking-control'>▶</button>
						</div>
					</div>
				))}
			</div>
			<div className='add-tracking'>
				<span>+ Add widget</span>
			</div>
		</div>
	);
}

export default MyTracking;
