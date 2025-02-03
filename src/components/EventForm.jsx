import * as React from "react";
import { useState } from "react";
import "../styles/form.css";

export default function EventForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "",
    imageUrl: "",
    infoUrl: "",
    password: "",
    isRecurring: false,
    recurringType: "none",
    recurringUntil: "",
    recurringDays: []
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const events = [];
      if (formData.isRecurring && formData.recurringUntil) {
        const startDate = new Date(formData.date);
        const endDate = new Date(formData.recurringUntil);
        
        while (startDate <= endDate) {
          if (formData.recurringType === 'weekly') {
            // For weekly events, check if the current day is selected
            const dayOfWeek = startDate.getDay();
            if (formData.recurringDays.includes(dayOfWeek)) {
              events.push({
                ...formData,
                date: startDate.toISOString().split('T')[0]
              });
            }
          } else if (formData.recurringType === 'daily') {
            events.push({
              ...formData,
              date: startDate.toISOString().split('T')[0]
            });
          }
          
          // Increment date based on recurring type
          startDate.setDate(startDate.getDate() + 1);
        }
      } else {
        events.push(formData);
      }

      // Submit all events
      for (const event of events) {
        await onSubmit(event);
      }

      setFormData({
        title: "",
        organization: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        category: "",
        imageUrl: "",
        infoUrl: "",
        password: "",
        isRecurring: false,
        recurringType: "none",
        recurringUntil: "",
        recurringDays: []
      });

      alert("Event(s) submitted successfully!");
    } catch (error) {
      console.error("Error in form submission:", error);
      setError(error.message === 'Incorrect password' 
        ? "Incorrect password. Please try again."
        : "Error submitting event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'isRecurring') {
      setFormData(prev => ({
        ...prev,
        isRecurring: checked,
        recurringType: checked ? 'daily' : 'none'
      }));
    } else if (name === 'recurringDays') {
      const dayNumber = parseInt(value);
      setFormData(prev => ({
        ...prev,
        recurringDays: prev.recurringDays.includes(dayNumber)
          ? prev.recurringDays.filter(day => day !== dayNumber)
          : [...prev.recurringDays, dayNumber]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (name === 'password') setError('');
  };

  // Insert the recurring event options after the end time field
  return (
    <form onSubmit={handleSubmit} className="event-form">
      {/* Previous form fields remain the same until endTime */}
      
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="isRecurring"
            checked={formData.isRecurring}
            onChange={handleChange}
          />
          Recurring Event
        </label>
      </div>

      {formData.isRecurring && (
        <>
          <div className="form-group">
            <label htmlFor="recurringType">Recurrence Pattern</label>
            <select
              id="recurringType"
              name="recurringType"
              value={formData.recurringType}
              onChange={handleChange}
              required
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {formData.recurringType === 'weekly' && (
            <div className="form-group">
              <label>Repeat On</label>
              <div className="weekday-selector">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      name="recurringDays"
                      value={index}
                      checked={formData.recurringDays.includes(index)}
                      onChange={handleChange}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="recurringUntil">Repeat Until</label>
            <input
              type="date"
              id="recurringUntil"
              name="recurringUntil"
              value={formData.recurringUntil}
              onChange={handleChange}
              required
              min={formData.date}
            />
          </div>
        </>
      )}

      {/* Rest of the form fields remain the same */}
    </form>
  );
}