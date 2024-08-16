// src/components/TextTool.js
import React, { useState } from 'react';
import './TextTool.css';

const TextTool = ({ onAddText, onClose }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onAddText(text);
    onClose();
  };

  return (
    <div className="text-tool">
      <textarea
        placeholder="Enter text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Text</button>
      <button className="text-tool-close" onClick={onClose}>Close Text Tool</button>
    </div>
  );
};

export default TextTool;
