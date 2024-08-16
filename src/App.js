// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; // Ensure this path is correct
import Whiteboard from './components/Whiteboard'; // Ensure this path is correct
import Footer from './components/Footer';
import './App.css'; // Ensure global styles are imported

const App = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  // Handlers for selecting tools
  const handleAddText = () => setSelectedTool('text');
  const handleAddShape = () => setSelectedTool('shape');
  const handleAddImage = () => setSelectedTool('image');
  const handleAddTemplate = () => setSelectedTool('template');

  return (
    <div className="app">
      <Navbar />
      <div className="main-container">
        <Sidebar
          onAddText={handleAddText}
          onAddShape={handleAddShape}
          onAddImage={handleAddImage}
          onAddTemplate={handleAddTemplate}
        />
        <div className="main-content">
          <Whiteboard selectedTool={selectedTool} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
