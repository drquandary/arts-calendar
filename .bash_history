npm run dev
killall node
npm run dev
pkill node
refreesh
refresh
npm run dev
refresh
npm run build
refresh
npm run build
npm run preview
refresh
npm run build
npm run preview
find . -type f -not -path "*/node_modules/*" -not -path "*/\.*" -exec echo "=== {} ===" \; -exec cat {} \; 2>/dev/null
npm run build
refresh
npm install
-rf node_modules
rm -rf node_modules
rm package-lock.json
chmod -R 777 .
cp -r . ../backup
npm install --unsafe-perm=true --allow-root
npm cache clean --force
rm -rf node_modules package-lock.json
refresh
npm install
npm run build
refresh
npm install
npm run build
npm run build
npm run build
npm install
npm run build
refresh
refresh
npm install
npm run build
refresh
npm install
npm run build
npm run preview
npm install
refresh
npm run build
npm run preview
npm install
npm build
npm run build
npm run preview
refresh
npm install
npm run build
refresh
npm run build
npm run preview
refresh
npm run build
npm run preview
refresh
npm build
npm run build
npm run preview
refresh
npm run build
npm run preview
refresh
npm run build
refresh
npm run build
refresh
npm run build
npm run preview
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
npm run preview
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
npm run preview
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
npm install sqlite3 express
npm install sqlite3 express body-parser
refresh
npm run build
refresh
npm run build
npm refresh
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
sqlite3 .data/sqlite.db
refresh
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm install
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run build
npm run build
npm run build
rm .data/sqlite.db
refresh
rm .data/sqlite.db
npm start
npm run build
kill $(lsof -t -i:3000)
refresh
sqlite3 .data/sqlite.db
DROP TABLE events;
sqlite3 .data/sqlite.db
refresh
npm run build
refresh
sqlite3 .data/sqlite.db
refresh
refresh
refresh
refresh
refresh
npm run build
refresh
npm run build
refresh
refresh
refresh
refresh
refresh
refresh
npm run build
refresh
npm tun build
npm run build
npm run build
refresh
npm run build
refresh
npm run build
refresh
npm run start
pkill node
refresh
kill all node
refresh
kill all node
killall node
refresh
npm refresh
refresh
refresh
refresh
refresh
refresh
refresh
refresh
npm run build
npm run build
npm run build
npm run build
npm run build
refresh
npm run start
npm refresh
refresh
npm run start
/* Base Layout */
body {
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}
/* Calendar Page Layout */
.main-content, 
.content, 
.calendar-page {
}
.calendar-page {
}
.main-content {
}
.calendar-container {
  background-color: #FAF9F6 !important;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  min-height: 100vh;
  overflow-x: hidden;
}
.debug-info {
  font-size: 12px;
  color: gray;
  margin: 10px 0;
}
/* Calendar Header */
.calendar-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
}
/* Date Navigation */
.date-navigation {
  order: -1;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.date-navigation button {
  background: none;
  border: none;
  color: #1C05B3;
  font-size: 1.2rem;
  padding: 4px 8px;
  cursor: pointer;
  transition: color 0.2s;
}
.date-navigation h2 {
  margin: 0;
  font-size: 1.2rem;
  white-space: nowrap;
}
/* View Controls */
.view-controls {
  display: flex;
  gap: 10px;
}
.view-button {
  color: #1C05B3;
  background: transparent;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.2s;
}
.view-button.active {
  color: #000000;
  border-bottom: 2px solid #1C05B3;
}
/* Events Grid */
.events-container {
  width: 100%;
  overflow-x: hidden;
}
.events-grid {
}
/* Event Card */
.event-card {
}
.event-time {
  color: #000 !important;
  border-bottom: 1px solid #4400ff !important;
}
.event-title {
  color: #333 !important;
}
.event-location {
  color: #4400ff !important;
}
.event-category {
  color: #666 !important;
}
/* Event Images */
.event-image-container {
}
.event-image-container img {
}
/* Week Layout */
.week-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
}
/* Day Pair - Horizontal Container */
.day-pair {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
/* Sunday special case - only one day in the pair */
.sunday-pair {
  justify-content: flex-start;
}
.sunday-pair .day-container {
  width: 50%; /* Same width as other day containers for consistency */
}
/* Day Container */
.day-container {
  width: 50%;
  padding: 0 10px;
  box-sizing: border-box;
}
/* Day Header */
.day-header {
  color: #4400ff !important;
  border-bottom: 2px solid #4400ff !important;
}
/* No events message */
.no-events {
  padding: 15px;
  text-align: center;
  color: #666;
  font-style: italic;
}
/* Footer */
.page-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1C05B3;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 100;
}
.nav-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 0;
}
.nav-link {
  color: #87CEEB;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: color 0.2s;
  text-transform: uppercase;
  padding: 8px 0;
  border: none;
  background: none;
  cursor: pointer;
}
.nav-link:hover {
  color: #ffffff;
}
.nav-link.active {
  color: #ffffff;
  border-bottom: 2px solid #87CEEB;
}
/* Media Queries */
@media (max-width: 768px) {
  .calendar-header {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .date-navigation {
    order: 0;
    justify-content: center;
  }
  .view-controls {
    justify-content: center;
  }
  
  .event-card {
  }
  
  .event-time {
  }
  
  .day-pair {
    flex-direction: column;
  }
  
  .day-container, 
  .sunday-pair .day-container {
    width: 100%;
    padding: 0;
  }
}
@media (min-width: 769px) {
  .events-grid {
  }
refresh
refresh
npm run build
npm run build
npm run build
refresh
refresh
npm run build
npm refresh
refresh
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
refresj
refresh
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
npm run build
refresh
refresh
refresh
npm run build
npm run build
npm run build
