import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CalendarPage from "../pages/calendar";

/**
 * The router is imported in app.jsx
 *
 * Our site has just one route: Calendar
 * The Calendar component is defined in /pages
 */
export default function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/calendar" />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}