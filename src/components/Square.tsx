import React from 'react';
import './Square.css';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button 
      className={`square ${value ? value.toLowerCase() : ''}`} 
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;