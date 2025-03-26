import React from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/tenxpage.css";

function Calendar() {
	return (
		<div className='calendar-container white-bg'>
			<ReactCalendar />
		</div>
	);
}

export default Calendar;