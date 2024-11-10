import * as React from "react";
import { useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import "../styles/calendar-page.css";

export default function CalendarPage() {
  const [view, setView] = useState('calendar');
  const [events, setEvents] = useState([]);

  const handleAddEvent = (newEvent) => {
    console.log('Adding new event:', newEvent); // Debug log
    const eventWithId = {
      ...newEvent,
      id: events.length + 1,
    };
    setEvents(prevEvents => [...prevEvents, eventWithId]);
    setView('calendar');
    alert('Event added!'); // Feedback for user
  };

  return (
    <div className="calendar-page">
      <h1>Penn Arts Calendar</h1>
      
      {/* Debug info */}
      <div style={{fontSize: '12px', color: 'gray', margin: '10px 0'}}>
        Current view: {view}, Number of events: {events.length}
      </div>

      <div className="nav-buttons">
        <button 
          onClick={() => {
            console.log('Switching to calendar view'); // Debug log
            setView('calendar');
          }}
          style={{
            backgroundColor: view === 'calendar' ? '#1e4b8d' : 'white',
            color: view === 'calendar' ? 'white' : '#1e4b8d',
            padding: '8px 16px',
            margin: '0 5px',
            border: '1px solid #1e4b8d',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          View Calendar
        </button>
        <button 
          onClick={() => {
            console.log('Switching to submit view'); // Debug log
            setView('submit');
          }}
          style={{
            backgroundColor: view === 'submit' ? '#1e4b8d' : 'white',
            color: view === 'submit' ? 'white' : '#1e4b8d',
            padding: '8px 16px',
            margin: '0 5px',
            border: '1px solid #1e4b8d',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit Event
        </button>
      </div>

      <div className="main-content">
        {view === 'calendar' ? (
          <EventCalendar events={events} setEvents={setEvents} />
        ) : (
          <EventForm onSubmit={handleAddEvent} />
        )}
      </div>
    </div>
  );
}