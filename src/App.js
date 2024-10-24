import Page1 from "./Page1.js";
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        
      <Routes>
        <Route path="/" element={<Page1/>} />
        
      </Routes>
        
    </Router>
      
      
  );
}

export default App;
