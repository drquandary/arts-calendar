import React, { useState, useEffect } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import '../styles/calendar.css';

function CalendarPage() {
  const [view, setView] = useState('calendar');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events...');
      const response = await fetch('/api/events');
      console.log('Response status:', response.status);
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      console.log('Fetched events:', data);
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

 const handleAddEvent = async (newEvent) => {
    try {
      console.log('Submitting new event:', newEvent);
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add event');
      }
      
      console.log('Event submitted successfully');
      // Fetch updated events list
      await fetchEvents();
      setView('calendar');
    } catch (err) {
      console.error('Error adding event:', err);
      throw err; // This will be caught by the EventForm's error handling
    }
  };
  if (isLoading) {
    return <div className="loading">Loading events...</div>;
  }
  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  return (
    <div className="calendar-page">
      <div className="debug-info">
        Current view: {view}, Number of events: {events.length}
      </div>
      
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