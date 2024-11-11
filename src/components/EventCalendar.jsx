import React, { useState } from 'react';
import '../styles/calendar.css';

const styles = {
  primaryColor: '#4400ff',  // Neon blue
  backgroundColor: '#EEF4ED'
};

const EventCalendar = ({ events }) => {
  const [view, setView] = useState('day');
  const [currentDate, setCurrentDate] = useState(new Date());

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
    console.log("Checking visible events. All events:", events);
    console.log("Current date:", currentDate);

    return events.filter(event => {
      const eventDate = new Date(event.date + 'T00:00:00');
      const compareDate = new Date(currentDate);
      compareDate.setHours(0, 0, 0, 0);

      console.log(`Comparing event ${event.title}:`, {
        eventDate: eventDate.toDateString(),
        compareDate: compareDate.toDateString()
      });

      if (view === 'day') {
        const matches = eventDate.toDateString() === compareDate.toDateString();
        console.log("Day view match?", matches);
        return matches;
      } else {
        const weekStart = new Date(compareDate);
        weekStart.setDate(compareDate.getDate() - compareDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        const matches = eventDate >= weekStart && eventDate <= weekEnd;
        console.log("Week view match?", matches);
        return matches;
      }
    }).sort((a, b) => {
      const dateCompare = new Date(a.date) - new Date(b.date);
      if (dateCompare === 0) {
        return a.startTime.localeCompare(b.startTime);
      }
      return dateCompare;
    });
  };

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
      <div className="events-container">
        {getVisibleEvents().length > 0 ? (
          getVisibleEvents().map((event, index) => (
            <div key={index} className="event-card">
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
            {event.imagePreview && (  // Check that we're using the correct property name
              <div className="event-image-container" style={{
                marginTop: '10px',
                maxWidth: '200px'
              }}>
                <img 
                  src={event.imagePreview}  // Make sure this matches the property name
                  alt={event.title} 
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '4px'
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