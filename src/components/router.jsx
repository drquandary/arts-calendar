import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Home from "../pages/home";
import About from "../pages/about";
import CalendarPage from "../pages/calendar";

/**
* The router is imported in app.jsx
*
* Our site has three routes: Home, Calendar, and About
* Each one is defined as a component in /pages
*/
export default () => (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/calendar" component={CalendarPage} />
    </Switch>
);