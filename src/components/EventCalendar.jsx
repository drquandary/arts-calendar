import DeleteEventButton from './DeleteEventButton';
import React, { useState, useEffect } from 'react';
import '../styles/calendar.css';

const styles = {
  primaryColor: '#4400ff',  // Neon blue
  backgroundColor: '#FAF9F6'
};

const EventCalendar = ({ events: propEvents }) => {
  const [view, setView] = useState('week'); // Default to week view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (propEvents) {
      setEvents(propEvents);
      setIsLoading(false);
    } else {
      fetchEvents();
    }
  }, [propEvents]);
  
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

  const groupEventsByDay = (events, weekStart) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const groupedEvents = {};
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);
      groupedEvents[days[i]] = {
        date: currentDate,
        events: []
      };
    }

    events.forEach(event => {
      const eventDate = new Date(event.date + 'T00:00:00');
      const dayName = days[eventDate.getDay()];
      groupedEvents[dayName].events.push(event);
    });

    return groupedEvents;
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

  const renderEventCard = (event) => (
    <div className="event-card">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start'
      }}>
        <div className="event-time">
          {formatTime(event.startTime)}
          {event.endTime && ` - ${formatTime(event.endTime)}`}
        </div>
        <DeleteEventButton 
          eventId={event.id} 
          onDeleteSuccess={fetchEvents} 
        />
      </div>
      <div className="event-main">
        <h3 className="event-title">
          {event.title}
        </h3>
        <p className="event-location">
          {event.location}
        </p>
        <p className="event-category">
          {event.category}
        </p>
        {event.imageUrl && (
          <div className="event-image-container">
            <img
              src={event.imageUrl}
              alt={event.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        {event.infoUrl && (
          <a 
            href={event.infoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="learn-more-link"
          >
            Learn More
          </a>
        )}
      </div>
    </div>
  );

  const renderEvents = () => {
  if (view === 'day') {
    return getVisibleEvents().length > 0 ? (
      <div className="events-grid">
        {getVisibleEvents().map((event, index) => (
          <div key={event.id || index}>
            {renderEventCard(event)}
          </div>
        ))}
      </div>
    ) : (
      <div className="no-events">No events scheduled for today</div>
    );
  } else {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const groupedEvents = groupEventsByDay(getVisibleEvents(), weekStart);
    
    // Vertically stacked horizontal day pairs
    return (
      <div className="week-layout">
        {/* Monday-Tuesday Pair */}
        <div className="day-pair">
          <div className="day-container">
            <h2 className="day-header">Monday</h2>
            {groupedEvents['Monday']?.events.length > 0 ? (
              <div className="events-grid">
                {groupedEvents['Monday'].events.map((event, idx) => (
                  <div key={event.id || idx}>{renderEventCard(event)}</div>
                ))}
              </div>
            ) : (
              <div className="no-events">No events scheduled</div>
            )}
          </div>
          
          <div className="day-container">
            <h2 className="day-header">Tuesday</h2>
            {groupedEvents['Tuesday']?.events.length > 0 ? (
              <div className="events-grid">
                {groupedEvents['Tuesday'].events.map((event, idx) => (
                  <div key={event.id || idx}>{renderEventCard(event)}</div>
                ))}
              </div>
            ) : (
              <div className="no-events">No events scheduled</div>
            )}
          </div>
        </div>

        {/* Wednesday-Thursday Pair */}
        <div className="day-pair">
          <div className="day-container">
            <h2 className="day-header">Wednesday</h2>
            {groupedEvents['Wednesday']?.events.length > 0 ? (
              <div className="events-grid">
                {groupedEvents['Wednesday'].events.map((event, idx) => (
                  <div key={event.id || idx}>{renderEventCard(event)}</div>
                ))}
              </div>
            ) : (
              <div className="no-events">No events scheduled</div>
            )}
          </div>
          
          <div className="day-container">
            <h2 className="day-header">Thursday</h2>
            {groupedEvents['Thursday']?.events.length > 0 ? (
              <div className="events-grid">
                {groupedEvents['Thursday'].events.map((event, idx) => (
                  <div key={event.id || idx}>{renderEventCard(event)}</div>
                ))}
              </div>
            ) : (
              <div className="no-events">No events scheduled</div>
            )}
          </div>
        </div>

        {/* Friday-Saturday Pair */}
        <div className="day-pair">
          <div className="day-container">
            <h2 className="day-header">Friday</h2>
            {groupedEvents['Friday']?.events.length > 0 ? (
              <div className="events-grid">
                {groupedEvents['Friday'].events.map((event, idx) => (
                  <div key={event.id || idx}>{renderEventCard(event)}</div>
                ))}
              </div>
            ) : (
              <div className="no-events">No events scheduled</div>
            )}
          </div>
          
          <div className="day-container">
            <h2 className="day-header">Saturday</h2>
            {groupedEvents['Saturday']?.events.length > 0 ? (
              <div className="events-grid">
                {groupedEvents['Saturday'].events.map((event, idx) => (
                  <div key={event.id || idx}>{renderEventCard(event)}</div>
                ))}
              </div>
            ) : (
              <div className="no-events">No events scheduled</div>
            )}
          </div>
        </div>

        {/* Sunday - Single Day */}
        <div className="day-pair sunday-pair">
          <div className="day-container">
            <h2 className="day-header">Sunday</h2>
            {groupedEvents['Sunday']?.events.length > 0 ? (
              <div className="events-grid">
                {groupedEvents['Sunday'].events.map((event, idx) => (
                  <div key={event.id || idx}>{renderEventCard(event)}</div>
                ))}
              </div>
            ) : (
              <div className="no-events">No events scheduled</div>
            )}
          </div>
        </div>
      </div>
    );
  }
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
        {renderEvents()}
      </div>
    </div>
  );
};

export default EventCalendar;