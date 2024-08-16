// src/components/Popup.js
import React from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

const Popup = ({ content, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {content}
        <button className="popup-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  content: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
