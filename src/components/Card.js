// src/components/Card.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './Card.css';
import Popup from './Popup';

const Card = ({ id, text, left, top, width, height, onResize }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div style={{ position: 'absolute', left, top }}>
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[100, 50]}
        maxConstraints={[600, 400]}
        onResize={(e, data) => onResize(id, data.size.width, data.size.height)}
        resizeHandles={['se']}
        className="card"
        style={{ opacity: isDragging ? 0.5 : 1 }}
        ref={drag}
      >
        <div className="card-content">
          {text.length > 50 ? text.substring(0, 50) + '...' : text}
          {text.length > 50 && (
            <button className="show-more-btn" onClick={togglePopup}>Show More</button>
          )}
        </div>
      </ResizableBox>
      {isPopupOpen && (
        <Popup
          content={<div><h2>Card Details</h2><p>{text}</p></div>}
          onClose={togglePopup}
        />
      )}
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onResize: PropTypes.func.isRequired,
};

export default Card;
