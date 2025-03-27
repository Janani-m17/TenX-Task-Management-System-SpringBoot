import React, { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/tenxpage.css";

function Calendar({ onDateSelect }) {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = (date) => {
		console.log("Raw Selected Date:", date);
	
		const selectedDate = new Date(date);
	
		// Format date as YYYY-MM-DD in local time
		const formattedDate = selectedDate.getFullYear() +
			"-" + String(selectedDate.getMonth() + 1).padStart(2, "0") +
			"-" + String(selectedDate.getDate()).padStart(2, "0");
	
		console.log("Fixed Date Sent to API:", formattedDate);
	
		setSelectedDate(date);
		onDateSelect(formattedDate); // Pass the correctly formatted date
	};
	

	return (
		<div className='calendar-container white-bg'>
			<ReactCalendar onClickDay={handleDateChange} value={selectedDate} />
		</div>
	);
}

export default Calendar;
