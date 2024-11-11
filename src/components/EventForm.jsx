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
    password: "" // Added password field
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(""); // Added error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    
    // Check password against environment variable
    if (formData.password !== import.meta.env.VITE_EVENT_PASSWORD) {
      setError("Invalid password. Event not submitted.");
      return;
    }
    
    try {
      // Create a date object in Eastern Time
      const dateStr = formData.date;
      console.log("Original date from form:", dateStr);
      
      const dateInET = new Date(dateStr + 'T00:00:00-05:00');
      console.log("Date object in ET:", dateInET);
      
      // Include the image preview in the form data but remove password
      const { password, ...eventDataWithoutPassword } = formData;
      const updatedFormData = {
        ...eventDataWithoutPassword,
        imagePreview: imagePreview
      };

      console.log("Submitting form data:", updatedFormData);
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

      alert("Event submitted!");
    } catch (error) {
      console.error("Error in form submission:", error);
      alert("Error submitting event. Check console for details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (file) => {
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image file (PNG, JPG, etc)");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

      {/* Regular form fields */}
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
        <label htmlFor="date">Date*</label>
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

      {/* Image Upload Area */}
      <div className="form-group">
        <label>Event Poster/Image</label>
        <div
          className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            style={{ display: 'none' }}
          />
          {!imagePreview ? (
            <div className="upload-prompt">
              <div className="upload-icon">📁</div>
              <p>Drag and drop an image here or click to select</p>
              <p className="upload-subtitle">Supports: PNG, JPG, GIF</p>
            </div>
          ) : (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <button 
                type="button" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="remove-image"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Password field added near the end */}
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