import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CalendarPage from "../pages/CalendarPage.jsx";  // Updated import path

export default function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/calendar" />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}