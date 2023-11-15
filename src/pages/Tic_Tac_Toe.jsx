import React, { useState, useEffect } from 'react';

import './Tic_Tac_Toe.css'

const TicTacToe = () => {
  const initialState = {
    isStarted: false,
    squares: Array(9).fill(null),
    xIsNext: Math.random() < 0.5 ? 'X' : 'O',
    winner: null,
  };

  const [gameState, setGameState] = useState(initialState);

  const iniciarJuego = () => {
    setGameState({
      ...initialState,
      isStarted: true,
    });
  };

  const reiniciarJuego = () => {
    setGameState({
      ...initialState,
      isStarted: true,
    });
  };

  useEffect(() => {
    const { isStarted, squares } = gameState;
    if (isStarted) {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      const calculateWinner = () => {
        for (const combo of winningCombos) {
          const [a, b, c] = combo;
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      };
  
      const currentWinner = calculateWinner();
  
      // Comprobar si hay un ganador y establecerlo en el estado
      if (currentWinner) {
        setGameState((prevState) => ({
          ...prevState,
          winner: currentWinner,
        }));
      }
    }
  }, [gameState]);
  

  const handleClick = (i) => {
    if (gameState.winner || gameState.squares[i] || !gameState.isStarted) {
      return;
    }
    const newSquares = gameState.squares.slice();
    newSquares[i] = gameState.xIsNext;
    setGameState({
      ...gameState,
      squares: newSquares,
      xIsNext: gameState.xIsNext === 'X' ? 'O' : 'X',
    });
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {gameState.squares[i]}
      </button>
    );
  };

  const status = gameState.winner ? `Ganador: ${gameState.winner}` : `Siguiente jugador: ${gameState.xIsNext}`;

  return (
    <div>
      <div>
        {!gameState.isStarted && <button onClick={iniciarJuego}>Iniciar Juego</button>}
      </div>
      {gameState.isStarted && (
        <div>
          <h2>3 en Raya</h2>
          <button onClick={reiniciarJuego}>Reiniciar Juego</button>
          <div className="status">{status}</div>
          <div className="board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
