// src/components/Toolbar.js
import React from 'react';
import { FiSquare, FiCircle, FiTrash2, FiType, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import './Toolbar.css';

const Toolbar = ({ addCard }) => {
  return (
    <div className="toolbar">
      <h2>Tools</h2>
      <button onClick={addCard}>
        <FiSquare /> Add Card
      </button>
      <button>
        <FiCircle /> Draw Circle
      </button>
      <button>
        <FiType /> Add Text
      </button>
      <button>
        <FiTrash2 /> Delete
      </button>
      <button>
        <FiArrowLeftCircle /> Undo
      </button>
      <button>
        <FiArrowRightCircle /> Redo
      </button>
    </div>
  );
};

export default Toolbar;
