import React, { useState } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import '../styles/calendar-page.css';

function CalendarPage() {
  const [view, setView] = useState('calendar');
  const [events, setEvents] = useState([]);  // Make sure this is initialized as an empty array

  const handleAddEvent = (newEvent) => {
    console.log("Current events:", events);
    // Add the new event with a unique ID
    const eventWithId = {
      ...newEvent,
      id: Date.now(), // Using timestamp as unique ID
    };
    console.log("Adding new event:", eventWithId);
    setEvents(prevEvents => [...prevEvents, eventWithId]);
    setView('calendar');
    console.log("Updated events:", [...events, eventWithId]);
  };

  // Add this useEffect to log events whenever they change
  useEffect(() => {
    console.log("Events updated:", events);
  }, [events]);

  return (
    <div className="calendar-page">
      <header className="header">
        <h1>Penn Arts Calendar</h1>
        <nav className="nav-buttons">
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
        </nav>
      </header>
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