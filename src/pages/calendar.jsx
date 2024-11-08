import React, { useState } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import '../styles/calendar-page.css';

export default function CalendarPage() {
  const [view, setView] = useState('calendar');
  const [events, setEvents] = useState([]);

  const handleAddEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: events.length + 1,
    };
    setEvents([...events, eventWithId]);
    setView('calendar');
  };

  return (
    <div className="calendar-page">
      <h1>Penn Arts Calendar</h1>
      <div className="nav-buttons">
        <button 
          className={`nav-button ${view === 'calendar' ? 'active' : ''}`}
          onClick={() => setView('calendar')}
        >
          View Calendar
        </button>
        <button 
          className={`nav-button ${view === 'submit' ? 'active' : ''}`}
          onClick={() => setView('submit')}
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