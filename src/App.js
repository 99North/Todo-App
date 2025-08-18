import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TodoApp from './components/TodoApp';
import './index.css';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Todo App route */}
          <Route path="/app" element={<TodoApp />} />
          
          {/* Redirect any unknown routes to landing page */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
