import React, { useState, useEffect } from 'react';
import './Sudoku.css';

const Sudoku = () => {
  const initialState = {
    isStarted: false,
    isGameOver: false,
  };

  const [gameState, setGameState] = useState(initialState);
  const [sudokuBoard, setSudokuBoard] = useState(null);
  const [board, setBoard] = useState([]);
  const [numberActive, setNumberActive] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [numberSelected, setNumberSelected] = useState('');

  useEffect(() => {
    const newPuzzle = [
      "--74916-5",
      "2---6-3-9",
      "-----7-1-",
      "-586----4",
      "--3----9-",
      "--62--187",
      "9-4-7---2",
      "67-83----",
      "81--45---",
    ];

    setSudokuBoard(newPuzzle);
    setBoard(newPuzzle.map((row) => row.split('').map((cell) => (cell === '-' ? null : parseInt(cell)))));
  }, []);

  const iniciarJuego = () => {
    setGameState({
      ...initialState,
      isStarted: true,
    });
  };

  const reiniciarJuego = () => {
    const newPuzzle = board;
    setSudokuBoard(newPuzzle);
    setGameState({
      ...initialState,
      isStarted: false,
    });
  };

  const handleCellClick = (row, col) => {
    if (numberActive) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberClick = (i) => {
    setNumberActive(!numberActive);
    setNumberSelected(i.toString());
  };

  const updateBoard = (row, col, value) => {
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
    );
    setBoard(newBoard);
  };

  const renderBoard = () => {
    if (sudokuBoard && sudokuBoard.length > 0) {
      return (
        <table className="sudoku-board">
          <tbody>
            {sudokuBoard.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.split('').map((cell, colIndex) => (
                  <td key={colIndex}>
                    <button
                      className={`sudoku-cell ${selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'active' : ''}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell === '-' ? (selectedCell.row === rowIndex && selectedCell.col === colIndex ? numberSelected : '') : cell}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return null;
  };

  const renderNumbers = () => {
    const numberButtons = [];
    for (let i = 1; i <= 9; i++) {
      numberButtons.push(
        <button onClick={() => handleNumberClick(i)} key={i}>
          {i}
        </button>
      );
    }
    return numberButtons;
  };

  return (
    <>
      <div>
        {!gameState.isStarted && <button onClick={iniciarJuego}>Iniciar Juego</button>}
      </div>
      {gameState.isStarted && (
        <div>
          <button onClick={reiniciarJuego}>Reiniciar juego</button>
          {renderBoard()}
          {renderNumbers()}
        </div>
      )}
    </>
  );
};

export default Sudoku;
