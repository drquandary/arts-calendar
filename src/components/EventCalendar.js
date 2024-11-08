import React, { useEffect, useState } from 'react';
import '../styles/calendar.css';  // We'll create this next

function EventCalendar({ events, setEvents }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample events for testing
    const sampleEvents = [
      {
        id: 1,
        title: "Botanical Workshop",
        organization: "CAMRA",
        date: "2024-11-08",
        startTime: "12:00",
        endTime: "15:00",
        location: "Penn Museum Room 329",
        category: "WORKSHOP"
      },
      {
        id: 2,
        title: "Love Sent Across Seas",
        date: "2024-11-08",
        startTime: "18:00",
        endTime: "20:00",
        location: "Penn Museum Lower Galleries",
        category: "EXHIBITION"
      }
    ];

    setEvents(sampleEvents);
    setLoading(false);
  }, [setEvents]);

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="calendar-container">
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-time">
              {event.startTime} - {event.endTime}
            </p>
            <p className="event-location">{event.location}</p>
            {event.organization && (
              <p className="event-org">Organized by: {event.organization}</p>
            )}
            <span className="category">{event.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventCalendar;