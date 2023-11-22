import React, { useState, useEffect } from 'react';
import sudoku, { makepuzzle, solvepuzzle } from 'sudoku';
import './Sudoku.css';

const Sudoku = () => {
  const initialState = {
    isStarted: false,
    isGameOver: false,
  };

  const [gameState, setGameState] = useState(initialState);
  const [sudokuBoard, setSudokuBoard] = useState(null);
  const [unsolvedSudokuboard, setUnsolvedSudokuboard] = useState(null)
  const [solutionPulsed, setSolutionPulsed] = useState(false)
  const [cellStates, setCellStates] = useState([]);


  useEffect(() => {
  
    const newPuzzle = sudoku.makepuzzle();
    const newPuzzle2 = newPuzzle.map((number) => (number === null ? 0 : number));
    setSudokuBoard(newPuzzle2);

    // Inicializa el estado de las celdas
    const initialCellStates = new Array(9).fill([]).map(() => new Array(9).fill(''));
    setCellStates(initialCellStates);
  }, []);

  const iniciarJuego = () => {
    setGameState({
      ...initialState,
      isStarted: true,
    });
  };

  const reiniciarJuego = () => {
    const newPuzzle = sudoku.makepuzzle();
    setSudokuBoard(newPuzzle);

    // Reinicia el estado de las celdas
    const initialCellStates = new Array(9).fill([]).map(() => new Array(9).fill(''));
    setCellStates(initialCellStates);

    setGameState({
      ...initialState,
      isStarted: true,
    });
  };

  const handleClick = (row, col, value) => {
    // Actualiza el estado de la celda específica
    const newCellStates = cellStates.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
    );
    setCellStates(newCellStates);
  };

  const Board = () => {
    const renderBoard = () => {
      const rows = [];

      for (let i = 0; i < 9; i++) {
        const row = sudokuBoard.slice(i * 9, (i + 1) * 9);
        rows.push(
          <div key={i} className="sudoku-row">
            {renderRow(row, i)}
          </div>
        );
      }

      return rows;
    };

    const renderRow = (row, rowIndex) => {
      return row.map((number, colIndex) => (
        <input
          key={colIndex}
          type="number"
          className="sudoku-cell"
          onChange={(e) => handleClick(rowIndex, colIndex, e.target.value)}
          value={number ? number : (cellStates[rowIndex][colIndex]) }
        />
      ));
    };

    return <div className="sudoku-board">{renderBoard()}</div>;
  };

  const solution = () => {
    if (sudokuBoard && !solutionPulsed) {
      // Clona el tablero actual para no modificar el estado directamente
      const currentBoard = [...sudokuBoard];
  
      // Intenta resolver el tablero
      const solved = solvepuzzle(currentBoard);
  
      if (solved) {
        // Si se pudo resolver, actualiza el estado con la solución
        setUnsolvedSudokuboard(sudokuBoard);
        setSudokuBoard(solved);
        setSolutionPulsed(true)
      } else {
        // Manejar el caso en que el tablero no tiene solución
        console.error('El tablero no tiene solución.');
        alert('El tablero no tiene solucion')
      }
    }
  };
 console.log(unsolvedSudokuboard)
 console.log(solutionPulsed)
  const back = () => {
    if (solutionPulsed) {
      setSolutionPulsed(false)
      setSudokuBoard(unsolvedSudokuboard)
    }
  }
  

  return (
    <>
      <div>
        {!gameState.isStarted && <button className='boton-iniciar' onClick={iniciarJuego}>Iniciar Juego</button>}
      </div>
      {gameState.isStarted && (
        <div>
          <button className='boton-reiniciar' onClick={reiniciarJuego}>Reiniciar juego</button>
          {Board()}
          <button className='solution-button' onClick={()=>solution()}>Solución</button>
          <button className='backButton' onClick={ back }>Volver al tablero</button>
        </div>
      )}
    </>
  );
};

export default Sudoku;
