import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import '../styles/styles.css'; // Ensure the correct path

const Canvas = ({ cards, setCards }) => {
  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.x + delta.x);
      const top = Math.round(item.y + delta.y);
      moveCard(item.id, left, top);
      return undefined;
    },
  });

  const moveCard = (id, left, top) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, x: left, y: top } : card
      )
    );
  };

  return (
    <div ref={drop} className="canvas">
      {cards.map((card, index) => (
        <Card key={index} id={card.id} text={card.text} x={card.x} y={card.y} />
      ))}
    </div>
  );
};

export default Canvas;
