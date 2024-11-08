import React, { useState } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import '../styles/calendar-page.css';

function CalendarPage() {
  const [view, setView] = useState('calendar');
  const [events, setEvents] = useState([]);

  const handleAddEvent = (newEvent) => {
    // Add the new event with a unique ID
    const eventWithId = {
      ...newEvent,
      id: events.length + 1, // Simple ID generation
    };
    setEvents([...events, eventWithId]);
    setView('calendar'); // Switch back to calendar view
    alert('Event added successfully!');
  };

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
          <EventCalendar events={events} setEvents={setEvents} />
        ) : (
          <EventForm onSubmit={handleAddEvent} />
        )}
      </main>

      <footer className="footer">
        <p>© 2024 Penn Arts Calendar</p>
      </footer>
    </div>
  );
}

export default CalendarPage;