import React, { useState, useEffect } from 'react';
import '../styles/calendar.css';

const styles = {
  primaryColor: '#4400ff',  // Neon blue
  backgroundColor: '#FAF9F6'
};

const EventCalendar = () => {
  const [view, setView] = useState('day');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + direction);
    } else {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    }
    setCurrentDate(newDate);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getVisibleEvents = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date + 'T00:00:00');
      const compareDate = new Date(currentDate);
      compareDate.setHours(0, 0, 0, 0);

      if (view === 'day') {
        return eventDate.toDateString() === compareDate.toDateString();
      } else {
        const weekStart = new Date(compareDate);
        weekStart.setDate(compareDate.getDate() - compareDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        return eventDate >= weekStart && eventDate <= weekEnd;
      }
    }).sort((a, b) => {
      const dateCompare = new Date(a.date) - new Date(b.date);
      if (dateCompare === 0) {
        return a.startTime.localeCompare(b.startTime);
      }
      return dateCompare;
    });
  };

  if (isLoading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return <div className="error">Error loading events: {error}</div>;
  }

  return (
    <div className="calendar-container" style={{ backgroundColor: styles.backgroundColor }}>
      <div className="calendar-header">
        <div className="view-controls">
          <button 
            className={`view-button ${view === 'day' ? 'active' : ''}`}
            onClick={() => setView('day')}
          >
            Day View
          </button>
          <button 
            className={`view-button ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week View
          </button>
        </div>
        
        <div className="date-navigation">
          <button onClick={() => navigateDate(-1)}>←</button>
          <h2 style={{ color: styles.primaryColor }}>
            {view === 'week' ? 'Week of ' : ''}{formatDate(currentDate)}
          </h2>
          <button onClick={() => navigateDate(1)}>→</button>
        </div>
      </div>

      <div className="events-container">
        {getVisibleEvents().length > 0 ? (
          getVisibleEvents().map((event, index) => (
            <div key={event.id || index} className="event-card">
              <div className="event-time" style={{ 
                display: 'inline-block',
                color: '#000',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                borderBottom: `1px solid ${styles.primaryColor}`,
                marginBottom: '8px',
                paddingBottom: '2px'
              }}>
                {formatTime(event.startTime)}
              </div>
              <div className="event-main">
                <h3 className="event-title" style={{
                  fontSize: '1.2rem',
                  margin: '8px 0',
                  fontWeight: 'normal'
                }}>
                  {event.title}
                </h3>
                <p className="event-location" style={{
                  color: styles.primaryColor,
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  margin: '4px 0'
                }}>
                  {event.location}
                </p>
                {event.imageUrl && (  // Changed from imagePreview to imageUrl
                  <div className="event-image-container" style={{
                    marginTop: '10px',
                    maxWidth: '200px'
                  }}>
                    <img 
                      src={event.imageUrl}
                      alt={event.title} 
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '4px'
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            No events scheduled for this {view}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;