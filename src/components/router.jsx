import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import CalendarPage from "../pages/calendar";

/**
* The router is imported in app.jsx
*
* Our site has three routes: Home, Calendar, and About
* Each one is defined as a component in /pages
*/
export default function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}