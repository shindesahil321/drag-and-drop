// src/components/DrawingTool.js
import React, { useRef, useEffect, useState } from 'react';
import './DrawingTool.css';

const DrawingTool = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      ctx.closePath();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrawing, context]);

  return (
    <div className="drawing-tool">
      <canvas ref={canvasRef} />
      <button className="drawing-tool-close" onClick={onClose}>Close Drawing Tool</button>
    </div>
  );
};

export default DrawingTool;
