// src/components/Connector.js
import React from 'react';
import '../styles/styles.css';

const Connector = ({ from, to }) => {
  return (
    <svg className="connector">
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Connector;
