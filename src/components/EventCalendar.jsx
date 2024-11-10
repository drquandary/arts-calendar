import React, { useState } from 'react';
import '../styles/calendar.css';

const EventCalendar = ({ events }) => {
  const [view, setView] = useState('day');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Navigate between dates
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + direction);
    } else {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    }
    setCurrentDate(newDate);
  };

  // Get events for the current view
  const getVisibleEvents = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      if (view === 'day') {
        return eventDate.toDateString() === currentDate.toDateString();
      } else {
        // For week view, get start and end of week
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return eventDate >= weekStart && eventDate <= weekEnd;
      }
    }).sort((a, b) => {
      // Sort by date and then by start time
      const dateCompare = new Date(a.date) - new Date(b.date);
      if (dateCompare === 0) {
        return a.startTime.localeCompare(b.startTime);
      }
      return dateCompare;
    });
  };

  // Get background color based on category
  const getCategoryColor = (category) => {
    const colors = {
      EXHIBITION: '#FFD700',
      WORKSHOP: '#98FB98',
      PERFORMANCE: '#87CEEB',
      LECTURE: '#DDA0DD',
      SCREENING: '#F08080',
      GATHERING: '#20B2AA',
      OTHER: '#D3D3D3'
    };
    return colors[category] || colors.OTHER;
  };

  return (
    <div className="calendar-container">
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
          <h2>{view === 'week' ? 'Week of ' : ''}{formatDate(currentDate)}</h2>
          <button onClick={() => navigateDate(1)}>→</button>
        </div>
      </div>

      <div className="events-container">
        {getVisibleEvents().length > 0 ? (
          getVisibleEvents().map((event, index) => (
            <div 
              key={index}
              className="event-card"
              style={{
                borderLeft: `4px solid ${getCategoryColor(event.category)}`
              }}
            >
              <div className="event-time">
                {event.startTime} - {event.endTime}
              </div>
              <div className="event-main">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-org">{event.organization}</p>
                <p className="event-location">{event.location}</p>
                {event.image && (
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="event-image"
                  />
                )}
                <span className="event-category">
                  {event.category.toLowerCase()}
                </span>
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