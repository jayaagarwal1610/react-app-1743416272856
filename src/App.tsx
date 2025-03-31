import React from 'react';
import Game from './components/Game';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
};

export default App;