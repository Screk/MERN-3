import React, { useState, useEffect } from 'react';

import './Hangman.css'

const Hangman = () => {

  const getRandomWord = () => {
    const wordList = ['HOUSE', 'PARACHUTE', 'CAR', 'ELEPHANT', 'RHINO', 'WHEATHER', 'COMPUTER', 'MOUSE', 'MONITOR', 'NUMBER'/* Otras palabras aquí */];
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };
  

  const initialState = {
    isStarted: false,
    wordToGuess: getRandomWord() , // La palabra a adivinar
    guessedLetters: [], // Letras adivinadas
    maxAttempts: 6, // Número máximo de intentos
    attemptsLeft: 6, // Intentos restantes
    lettersInput: [],
    isGameOver: false,
  };

  const [gameState, setGameState] = useState(initialState);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const iniciarJuego = () => {
    setGameState({
      ...initialState,
      isStarted: true,
    })
  };

  const reiniciarJuego = () => {
    setGameState({
      ...initialState,
      isStarted: true,
    });
    setIncorrectLetters([]);
    setIsGameOver(false); // Asegúrate de restablecer isGameOver a false
  };
  

  console.log(gameState.guessedLetters)


  const handleClick = (i) => {
    if (!isGameOver) {
      const newWord = gameState.wordToGuess.split('');
      if (newWord.includes(i) && !gameState.guessedLetters.includes(i)) {
        setGameState((prevState) => ({
          ...prevState,
          guessedLetters: [...prevState.guessedLetters, i],
        }));
        checkGameWon();
      } else if (!incorrectLetters.includes(i)) {
        setIncorrectLetters([...incorrectLetters, i]);
        setGameState((prevState) => ({
          ...prevState,
          attemptsLeft: prevState.attemptsLeft - 1,
        }));
        checkGameOver();
      }
    }
  };
  
  const checkGameOver = () => {
    if (gameState.attemptsLeft === 1) {
      setGameState((prevState) => ({
        ...prevState,
        isGameOver: true,
      }));
      setIsGameOver(true);
    }
  };

  const checkGameWon = () => {
    const wordToGuessArray = gameState.wordToGuess.split('');
    const isWordGuessed = wordToGuessArray.every((letter) => gameState.guessedLetters.includes(letter));

    if (isWordGuessed) {
      setGameState((prevState) => ({
        ...prevState,
        isGameOver: true,
      }));
      setIsGameOver(true);
    }
  };

  


  const renderLetter = (i) => {
    const isIncorrect = incorrectLetters.includes(i);
    const isCorrect = gameState.guessedLetters.includes(i);
  
    return (
    <button className={`letter ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}`} onClick={() => handleClick(i)}>
      {i}
    </button>

    );
  }
  

  const renderWord = () => {
    const newWordToGuess = gameState.wordToGuess;

    // Itera sobre la palabra a adivinar y genera la representación visual
    const displayedWord = newWordToGuess.split('').map((letter, index) => {
      if (gameState.guessedLetters.includes(letter)) {
        // La letra ha sido adivinada, muestra la letra
        return <button className="correct" key={index}>{letter}</button>;
      } else {
        // La letra no ha sido adivinada, muestra un espacio en blanco
        return <button className='letterToGuess' key={index}>_</button>;
      }
    });

    // Verifica si todas las letras han sido adivinadas
    const isWordGuessed = gameState.wordToGuess.split('').every((letter) => gameState.guessedLetters.includes(letter));

    if (isWordGuessed) {
      // Muestra un mensaje de victoria
      return (
        <div>
          {displayedWord}
          <p>¡Has ganado!</p>
        </div>
      );
    } else if (!isWordGuessed && gameState.attemptsLeft === 0) {
      return (
        <div>
          {displayedWord}
          <p>¡Has perdido!</p>
          <p>La palabra era: {gameState.wordToGuess} </p>
        </div>
      )
    }

    return displayedWord;
  };

  

  // Implementa las funciones para manejar las letras adivinadas, verificar el estado del juego, etc.

  useEffect(() => {
    const isGameOver = () => {
      // Verifica si el jugador adivinó todas las letras de la palabra
      const wordToGuessArray = gameState.wordToGuess.split('');
      const isWordGuessed = wordToGuessArray.every(letter => gameState.guessedLetters.includes(letter));
    
      if (isWordGuessed) {
        // El jugador adivinó correctamente la palabra
        setGameState(prevState => ({
          ...prevState,
          isGameOver: true,
        }));
      } else if (gameState.attemptsLeft === 0) {
        // El jugador se quedó sin intentos
        setGameState(prevState => ({
          ...prevState,
          isGameOver: true,
        }));
      }
    };
  
    isGameOver(); // Llamar a esta función al montar el componente
  
  }, [gameState]);
  

  return (
    <div>
      <div>
        {!gameState.isStarted && 
        <div className='intro3'>
          <img src="../images/ahorcado.jpg" alt="" />
          <button className='boton-iniciar' onClick={iniciarJuego}>Iniciar Juego</button>
        </div>}
      </div>
      {gameState.isStarted && (
        <div className='game'>
          <h2>Hangman</h2>
          <button className='boton-reiniciar' onClick={reiniciarJuego}>Reiniciar</button>
          <h3>Intentos restantes: {gameState.attemptsLeft}</h3>
          <h3 className='palabra'>Palabra: 
           <div className='huecos'>{renderWord()}</div>
          </h3>
          <div className='lettersGroup'>
            {renderLetter('A')}
            {renderLetter('B')}
            {renderLetter('C')}
            {renderLetter('D')}
            {renderLetter('E')}
            {renderLetter('F')}
            {renderLetter('G')}
            {renderLetter('H')}
            {renderLetter('I')}
            {renderLetter('J')}
            {renderLetter('K')}
          </div>
          <div className='lettersGroup'>
            {renderLetter('L')}
            {renderLetter('M')}
            {renderLetter('N')}
            {renderLetter('Ñ')}
            {renderLetter('O')}
            {renderLetter('P')}
            {renderLetter('Q')}
            {renderLetter('R')}
            {renderLetter('S')}
            {renderLetter('T')}
            {renderLetter('U')}
          </div>
          <div className='lettersGroup'>
            {renderLetter('V')}
            {renderLetter('W')}
            {renderLetter('X')}
            {renderLetter('Y')}
            {renderLetter('Z')}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hangman;
