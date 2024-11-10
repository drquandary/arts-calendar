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
// Add this helper function at the top with your other functions
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Get events for the current view
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
                {formatTime(event.startTime)} - {formatTime(event.endTime)}  // Changed from event.startTime/endTime
              </div>
            <div className="event-main">
              <h3 className="event-title">{event.title}</h3>
  <p className="event-org">{event.organization}</p>
  <p className="event-location">{event.location}</p>
  {event.imagePreview && (                // Changed from event.image to event.imagePreview
    <div className="event-image-container">
      <img 
        src={event.imagePreview} 
        alt={event.title} 
        className="event-thumbnail"
      />
    </div>
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