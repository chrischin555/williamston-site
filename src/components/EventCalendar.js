import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventCalendar = () => {
    const locales = {
        "en-US": require("date-fns/locale/en-US")
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })

    const events = [
        {
            title: "Community Donation Event",
            start: new Date(2023, 11, 5),
            end: new Date(2023, 11, 11)
        },
        {
            title: "Food Festival",
            start: new Date(2023, 11, 12),
            end: new Date(2023, 11, 16)
        },
        {
            title: "Bingo",
            start: new Date(2023, 11, 9),
            end: new Date(2023, 11, 9)
        },
    ]

    events.forEach(event => {
        const formattedStartDate = event.start.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        });

        console.log(`Event: ${event.title}, Start Date: ${formattedStartDate}`);
    });

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" })
    const [allEvents, setAllEvents] = useState(events)

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
    }


    return (
        <div className="Home">
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }}
                    value={newEvent.tile} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }}
                    selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })}
                />
                <DatePicker placeholderText="End Date"
                    selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })}
                />
                <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>Add Event</button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start"
                endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default EventCalendar;