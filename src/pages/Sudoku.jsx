import React, { useState, useEffect } from 'react';
import sudoku, { makepuzzle, solvepuzzle } from 'sudoku';
import './Sudoku.css';

const SudokuCell = ({ value, selected, onClick }) => (
  <td>
    <button
      className={`sudoku-cell ${selected ? 'active' : ''}`}
      onClick={onClick}
    >
      {value === null ? '' : value}
    </button>
  </td>
);

const SudokuNumberButton = ({ number, onClick }) => (
  <button onClick={onClick}>{number}</button>
);

const Sudoku = () => {
  const initialState = {
    isStarted: false,
    isGameOver: false,
  };

  const [gameState, setGameState] = useState(initialState);
  const [sudokuBoard, setSudokuBoard] = useState(null);
  const [permanentNumbers, setPermanentNumbers] = useState([]); // Nuevo estado para números permanentes
  const [numberActive, setNumberActive] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [numberSelected, setNumberSelected] = useState('');

  useEffect(() => {
    // Generar un nuevo rompecabezas usando la biblioteca sudoku
    const newPuzzle = sudoku.makepuzzle();
    console.log(newPuzzle)
    setSudokuBoard[newPuzzle];
    setPermanentNumbers([]); // Inicializar el estado de los números permanentes
  }, []);

  const iniciarJuego = () => {
    setGameState({
      ...initialState,
      isStarted: true,
    });
  };

  const reiniciarJuego = () => {
    // Generar un nuevo rompecabezas al reiniciar el juego
    const newPuzzle = sudoku.makepuzzle();
    setSudokuBoard(newPuzzle);
    setPermanentNumbers([]);
    setGameState({
      ...initialState,
      isStarted: true,
    });
  };

  const handleCellClick = (row, col) => {
    if (numberActive) {
      const newBoard = [...sudokuBoard];
      newBoard[row] = newBoard[row].split(''); // Convertir la fila en un array de caracteres
      newBoard[row][col] = parseInt(numberSelected);

      setSudokuBoard(newBoard);

      // Agregar el número seleccionado a la lista de permanentNumbers
      setPermanentNumbers([...permanentNumbers, { row, col, value: parseInt(numberSelected) }]);

      setSelectedCell({ row, col });
      setNumberActive(false);
      setNumberSelected('');
    }
  };

  const handleNumberClick = (i) => {
    setNumberActive(true);
    setNumberSelected(i.toString());
  };

  const renderBoard = () => {
    if (sudokuBoard && sudokuBoard.length > 0) {
      return (
        <table className="sudoku-board">
          <tbody>
            {sudokuBoard.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row !== null &&
                  row.split('').map((cell, colIndex) => (
                    <SudokuCell
                      key={colIndex}
                      value={cell === null ? (
                        permanentNumbers.some(item => item.row === rowIndex && item.col === colIndex) ?
                          permanentNumbers.find(item => item.row === rowIndex && item.col === colIndex).value :
                          (selectedCell.row === rowIndex && selectedCell.col === colIndex ? numberSelected : null)
                      ) : cell}
                      selected={selectedCell.row === rowIndex && selectedCell.col === colIndex}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    />
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
        <SudokuNumberButton key={i} number={i} onClick={() => handleNumberClick(i)} />
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
