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
    recurringUntil: ""
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
          events.push({
            ...formData,
            date: startDate.toISOString().split('T')[0]
          });
          startDate.setDate(startDate.getDate() + 7);
        }
      } else {
        events.push(formData);
      }

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
        recurringUntil: ""
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
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (name === 'password') setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>Submit New Event</h2>

      {error && (
        <div className="error-message" style={{
          color: '#dc3545',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          padding: '10px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Event Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="organization">Organization*</label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Start Date*</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startTime">Start Time*</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time*</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

    <div className="form-group">
  <label htmlFor="isRecurring" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333333' }}>
    Weekly Recurring Event?
  </label>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <input
      type="checkbox"
      id="isRecurring"
      name="isRecurring"
      checked={formData.isRecurring}
      onChange={handleChange}
      style={{ width: '20px', height: '20px' }}
    />
  </div>
</div>
      {formData.isRecurring && (
        <div className="form-group">
          <label htmlFor="recurringUntil">End Date*</label>
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
      )}

      <div className="form-group">
        <label htmlFor="location">Location*</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category*</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="EXHIBITION">Exhibition</option>
          <option value="WORKSHOP">Workshop</option>
          <option value="PERFORMANCE">Performance</option>
          <option value="LECTURE">Lecture</option>
          <option value="SCREENING">Screening</option>
          <option value="GATHERING">Gathering</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Event Image URL</label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/your-image.jpg"
        />
        <p className="help-text" style={{fontSize:'0.85rem',color:'#666',marginTop:'4px'}}>
          Need to add an image? Copy the "DIRECT LINK" URL after uploading your image to {' '}
          <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" style={{color:'#1C05B3'}}>
            postimages.org
          </a>
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="infoUrl">Event Website</label>
        <input
          type="url"
          id="infoUrl"
          name="infoUrl"
          value={formData.infoUrl}
          onChange={handleChange}
          placeholder="https://example.com/event-details"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Event Password*</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter the event submission password"
        />
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Event'}
      </button>
    </form>
  );
}