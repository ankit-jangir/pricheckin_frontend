// src/App.jsx - CLEANED UP VERSION
import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css'; // This is now an empty file

function App() {
  // Outlet is a placeholder where our routes (Login, OtpPage, etc.) will be rendered.
  return <Outlet />;
}

export default App;