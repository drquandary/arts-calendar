import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

// Import and apply CSS stylesheet
import "./styles/styles.css";

// Where all of our pages come from
import PageRouter from "./components/router.jsx";

// The component that adds our Meta tags to the page
import Seo from './components/seo.jsx';

// Home function that is reflected across the site
export default function Home() {
  return (
    <Router>
      <Seo />
      <main role="main" className="wrapper">
        <div className="content">
          {/* Router specifies which component to insert here as the main content */}
          <PageRouter />
        </div>
      </main>
      {/* Footer links to Home and About, Link elements matched in router.jsx */}
      <footer className="footer">
        <div className="links">
          <Link to="/">Home</Link>
          <span className="divider">|</span>
          <Link to="/calendar">Calendar</Link>
          <span className="divider">|</span>
          <Link to="/about">About</Link>
        </div>
        <a 
          className="btn--remix"
          target="_top"
          href="https://glitch.com/edit/#!/remix/glitch-hello-react"
        >
          <img 
            src="https://cdn.glitch.com/605e2a51-d45f-4d87-a285-9410ad350515%2FLogo_Color.svg?v=1618199565140" 
            alt="" 
          />
          Remix on Glitch
        </a>
      </footer>
    </Router>
  );
}