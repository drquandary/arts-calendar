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

  useEffect(() => {
    console.log("Events updated:", events);
  }, [events]);

  return (
    <div className="calendar-page">
      <main className="main-content">
        {view === 'calendar' ? (
          <EventCalendar events={events} />
        ) : (
          <EventForm onSubmit={handleAddEvent} />
        )}
      </main>
      <footer className="page-footer">
        <nav className="nav-links">
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
      </footer>
    </div>
  );
}

export default CalendarPage;