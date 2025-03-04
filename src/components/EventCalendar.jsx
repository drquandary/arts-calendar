import React, { useState, useEffect } from 'react';
import '../styles/calendar.css';
import DeleteEventButton from './DeleteEventButton';

const EventCalendar = ({ events: propEvents }) => {
  const [view, setView] = useState('week'); // Default to week view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Force week view on initial render
  useEffect(() => {
    setView('week');
  }, []);
  
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
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
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
    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const groupEventsByDay = (events, weekStart) => {
    // Create a deep copy of the weekStart date to avoid mutation issues
    const correctedWeekStart = new Date(weekStart.getTime());
    correctedWeekStart.setHours(0, 0, 0, 0); // Set to midnight
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const groupedEvents = {};
    
    // Initialize the days with corrected dates
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(correctedWeekStart.getTime());
      dayDate.setDate(correctedWeekStart.getDate() + i);
      const dayOfWeek = dayDate.getDay();
      const dayName = days[dayOfWeek];
      
      groupedEvents[dayName] = {
        date: dayDate,
        events: []
      };
    }
    
    // Assign events to their correct day based on the event date
    events.forEach(event => {
      // Ensure we're working with a proper date object
      const eventDate = new Date(`${event.date}T00:00:00`);
      
      // Only process valid dates
      if (!isNaN(eventDate.getTime())) {
        const eventDayOfWeek = eventDate.getDay();
        const dayName = days[eventDayOfWeek];
        
        // Add to the corresponding day if the day exists in our structure
        if (groupedEvents[dayName]) {
          groupedEvents[dayName].events.push(event);
        }
      }
    });
    
    return groupedEvents;
  };

  const getVisibleEvents = () => {
    // Filter events based on the selected view and date
    return events.filter(event => {
      // Skip invalid dates
      if (!event.date) return false;
      
      const eventDate = new Date(`${event.date}T00:00:00`);
      // Skip invalid dates
      if (isNaN(eventDate.getTime())) return false;
      
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
      // Sort by date first, then by start time
      const dateCompare = new Date(a.date) - new Date(b.date);
      if (dateCompare === 0 && a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      }
      return dateCompare;
    });
  };

  const renderEventCard = (event) => (
    <div className="event-card">
      <div className="event-time">
        <div className="time-display">
          {formatTime(event.startTime)}
          {event.endTime && ` - ${formatTime(event.endTime)}`}
        </div>
        <div className="delete-button-container">
          <DeleteEventButton 
            eventId={event.id} 
            onDeleteSuccess={fetchEvents} 
          />
        </div>
      </div>
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-location">{event.location}</p>
        <p className="event-category">{event.category}</p>
        {event.imageUrl && (
          <div className="event-image-container">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="event-image"
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

  const DayContainer = ({ day, events }) => (
    <div className="day-container">
      <h2 className="day-header">{day}</h2>
      {events.length > 0 ? (
        <div className="events-grid">
          {events.map((event, idx) => (
            <div key={event.id || idx} className="event-wrapper">
              {renderEventCard(event)}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-events">No events scheduled</div>
      )}
    </div>
  );

  const renderEvents = () => {
    const visibleEvents = getVisibleEvents();
    
    if (view === 'day') {
      return visibleEvents.length > 0 ? (
        <div className="events-grid">
          {visibleEvents.map((event, index) => (
            <div key={event.id || index} className="event-wrapper">
              {renderEventCard(event)}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-events">No events scheduled for today</div>
      );
    } else {
      // Week view implementation
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const groupedEvents = groupEventsByDay(visibleEvents, weekStart);
      
      // Create the week layout with improved structure for better scrolling
      return (
        <div className="week-layout">
          {/* Monday-Tuesday Pair */}
          <div className="day-pair">
            <DayContainer 
              day="Monday" 
              events={groupedEvents['Monday']?.events || []} 
            />
            <DayContainer 
              day="Tuesday" 
              events={groupedEvents['Tuesday']?.events || []} 
            />
          </div>

          {/* Wednesday-Thursday Pair */}
          <div className="day-pair">
            <DayContainer 
              day="Wednesday" 
              events={groupedEvents['Wednesday']?.events || []} 
            />
            <DayContainer 
              day="Thursday" 
              events={groupedEvents['Thursday']?.events || []} 
            />
          </div>

          {/* Friday-Saturday Pair */}
          <div className="day-pair">
            <DayContainer 
              day="Friday" 
              events={groupedEvents['Friday']?.events || []} 
            />
            <DayContainer 
              day="Saturday" 
              events={groupedEvents['Saturday']?.events || []} 
            />
          </div>

          {/* Sunday - Single Day */}
          <div className="day-pair sunday-pair">
            <DayContainer 
              day="Sunday" 
              events={groupedEvents['Sunday']?.events || []} 
            />
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
    <div className="calendar-container">
      {/* Calendar Title */}
      <div className="calendar-title">
        <h1>
          <span className="creative">COMMUNITY</span> <span className="calendar">HAPPENINGS</span>
        </h1>
      </div>
  
      <div className="calendar-header">
        <div className="date-navigation">
          <button className="nav-button" onClick={() => navigateDate(-1)}>←</button>
          <h2 className="current-date">
            {view === 'week' ? 'Week of ' : ''}{formatDate(currentDate)}