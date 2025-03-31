import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../utils/gameUtils';
import './Game.css';

const Game: React.FC = () => {
  const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [isXNext, setIsXNext] = useState<boolean>(true);
  
  const current = history[currentMove];
  const winner = calculateWinner(current);
  const status = winner 
    ? `Winner: ${winner}` 
    : currentMove === 9 
      ? 'Game ended in a draw' 
      : `Next player: ${isXNext ? 'X' : 'O'}`;

  const handleClick = (i: number) => {
    const historyCopy = history.slice(0, currentMove + 1);
    const currentSquares = [...historyCopy[historyCopy.length - 1]];
    
    // Return early if there's a winner or the square is already filled
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }
    
    currentSquares[i] = isXNext ? 'X' : 'O';
    
    setHistory([...historyCopy, currentSquares]);
    setCurrentMove(historyCopy.length);
    setIsXNext(!isXNext);
  };

  const jumpTo = (move: number) => {
    setCurrentMove(move);
    setIsXNext(move % 2 === 0);
  };

  const moves = history.map((_, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button 
          className={move === currentMove ? 'active' : ''}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setIsXNext(true);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;