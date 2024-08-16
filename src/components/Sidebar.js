// src/components/Sidebar.js
import React from 'react';
import { FaTextHeight, FaShapes, FaImage, FaFile } from 'react-icons/fa'; // Updated import
import './Sidebar.css';

const Sidebar = ({ onAddText, onAddShape, onAddImage, onAddTemplate }) => {
  return (
    <div className="sidebar">
      <h2>Tools</h2>
      <button className="tool-button" onClick={onAddText}>
        <FaTextHeight /> Add Text
      </button>
      <button className="tool-button" onClick={onAddShape}>
        <FaShapes /> Add Shape
      </button>
      <button className="tool-button" onClick={onAddImage}>
        <FaImage /> Add Image
      </button>
      <button className="tool-button" onClick={onAddTemplate}>
        <FaFile /> Add Template {/* Updated icon */}
      </button>
    </div>
  );
};

export default Sidebar;
