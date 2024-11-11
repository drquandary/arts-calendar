import * as React from "react";
import { useState, useRef } from "react";
import "../styles/form.css";

export default function EventForm({ onSubmit }) {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "",
    password: ""
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    
    // Check password against environment variable
    if (formData.password !== import.meta.env.VITE_EVENT_PASSWORD) {
      setError("Invalid password. Event not submitted.");
      return;
    }
    
    try {
      const dateStr = formData.date;
      const dateInET = new Date(dateStr + 'T00:00:00-05:00');
      
      // Remove password from the data being sent to calendar
      const { password, ...eventData } = formData;
      
      const updatedFormData = {
        ...eventData,
        imagePreview: imagePreview
      };

      onSubmit(updatedFormData);

      // Reset form
      setFormData({
        title: "",
        organization: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        category: "",
        password: ""
      });
      setSelectedFile(null);
      setImagePreview(null);

      alert("Event submitted successfully!");
    } catch (error) {
      console.error("Error in form submission:", error);
      setError("Error submitting event. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ... rest of your existing code for file handling ...

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

      {/* Your existing form fields here */}

      {/* Add password field near the end of the form */}
      <div className="form-group">
        <label htmlFor="password">Admin Password*</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Submit Event
      </button>
    </form>
  );
}