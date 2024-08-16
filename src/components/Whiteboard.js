import React, { useRef, useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { FaSquare, FaCircle, FaFont, FaSlash, FaPencilAlt, FaEraser, FaUndo, FaRedo, FaTrashAlt } from 'react-icons/fa';
import './Whiteboard.css';
import TemplateSection from './TemplateSection'; // Ensure correct import path

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [drawingMode, setDrawingMode] = useState('');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [templates, setTemplates] = useState([
    '/assets/templates/template1.png',
    '/assets/templates/template2.png',
  ]);

  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth - 300,
      height: window.innerHeight - 120, // Adjust height as needed
      backgroundColor: '#ffffff',
    });
    setCanvas(canvasInstance);

    return () => {
      canvasInstance.dispose();
    };
  }, []);

  const addObjectToCanvas = (object) => {
    if (canvas) {
      canvas.add(object);
      canvas.renderAll();
      setHistory((prevHistory) => [...prevHistory, canvas.toJSON()]);
      setRedoStack([]);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setRedoStack((prevStack) => [...prevStack, canvas.toJSON()]);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      canvas.loadFromJSON(lastState, canvas.renderAll.bind(canvas));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setHistory((prevHistory) => [...prevHistory, canvas.toJSON()]);
      setRedoStack((prevStack) => prevStack.slice(0, -1));
      canvas.loadFromJSON(nextState, canvas.renderAll.bind(canvas));
    }
  };

  const handleAddRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: currentColor,
      width: 100,
      height: 100,
      selectable: true,
    });
    addObjectToCanvas(rect);
  };

  const handleAddCircle = () => {
    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      fill: currentColor,
      radius: 50,
      selectable: true,
    });
    addObjectToCanvas(circle);
  };

  const handleAddText = () => {
    const text = new fabric.Text('Sample Text', {
      left: 300,
      top: 300,
      fontSize: 20,
      fill: currentColor,
      selectable: true,
    });
    addObjectToCanvas(text);
  };

  const handleAddLine = () => {
    const line = new fabric.Line([50, 100, 200, 200], {
      left: 50,
      top: 100,
      stroke: currentColor,
      strokeWidth: 5,
      selectable: true,
    });
    addObjectToCanvas(line);
  };

  const handleFreeDrawing = () => {
    if (canvas) {
      canvas.isDrawingMode = !canvas.isDrawingMode;
      canvas.freeDrawingBrush.color = currentColor;
      canvas.freeDrawingBrush.width = 5;
      setDrawingMode(canvas.isDrawingMode ? 'free' : '');
    }
  };

  const handleEraser = () => {
    if (canvas) {
      canvas.isDrawingMode = false;
      const objects = canvas.getObjects();
      objects.forEach((object) => {
        if (object.type === 'path' && object.stroke === 'rgba(0,0,0,0)') {
          canvas.remove(object);
        }
      });
    }
  };

  const handleChangeColor = (event) => {
    setCurrentColor(event.target.value);
  };

  const handleClearCanvas = () => {
    if (canvas) {
      canvas.clear();
      setHistory([]);
      setRedoStack([]);
    }
  };

  const handleAddTemplate = (template) => {
    if (canvas && template) {
      fabric.Image.fromURL(template, (img) => {
        img.set({
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
        });
        canvas.add(img);
        canvas.renderAll();
        setHistory((prevHistory) => [...prevHistory, canvas.toJSON()]);
        setRedoStack([]);
      });
    }
  };

  return (
    <div className="whiteboard-container">
      <div className="sidebar">
        <div className="toolbar">
          <h2>Tools</h2>
          <button onClick={handleAddRectangle} title="Add Rectangle">
            <FaSquare />
          </button>
          <button onClick={handleAddCircle} title="Add Circle">
            <FaCircle />
          </button>
          <button onClick={handleAddText} title="Add Text">
            <FaFont />
          </button>
          <button onClick={handleAddLine} title="Add Line">
            <FaSlash />
          </button>
          <button onClick={handleFreeDrawing} title={drawingMode === 'free' ? 'Stop Drawing' : 'Free Drawing'}>
            <FaPencilAlt />
          </button>
          <button onClick={handleEraser} title="Eraser">
            <FaEraser />
          </button>
          <button onClick={handleUndo} title="Undo">
            <FaUndo />
          </button>
          <button onClick={handleRedo} title="Redo">
            <FaRedo />
          </button>
          <button onClick={handleClearCanvas} title="Clear">
            <FaTrashAlt />
          </button>
          <input
            type="color"
            value={currentColor}
            onChange={handleChangeColor}
            title="Pick a color"
            className="color-picker"
          />
        </div>
        <TemplateSection templates={templates} onAddTemplate={handleAddTemplate} />
      </div>
      <div className="canvas-area">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Whiteboard;
