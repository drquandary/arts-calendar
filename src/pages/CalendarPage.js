import React, { useState, useEffect } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import '../styles/calendar-page.css';

function CalendarPage() {
  const [view, setView] = useState('calendar');
  const [events, setEvents] = useState([]);

  const handleAddEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now(),
    };
    setEvents(prevEvents => [...prevEvents, eventWithId]);
    setView('calendar');
  };

  return (
    <div className="calendar-page">
      {/* Debug info */}
      <div className="debug-info">
        Current view: {view}, Number of events: {events.length}
      </div>
      
      <nav className="nav-links header-nav">
        <a 
          href="#calendar"
          className={`nav-link ${view === 'calendar' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setView('calendar');
          }}
        >
          VIEW CALENDAR
        </a>
        <a 
          href="#submit"
          className={`nav-link ${view === 'submit' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setView('submit');
          }}
        >
          SUBMIT EVENT
        </a>
      </nav>

      <main className="main-content">
        {view === 'calendar' ? (
          <EventCalendar events={events} />
        ) : (
          <EventForm onSubmit={handleAddEvent} />
        )}
      </main>
    </div>
  );
}

export default CalendarPage;