import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'

import Home from './pages/Home.jsx'
import Tic_Tac_Toe from './pages/Tic_Tac_Toe.jsx'
import Hangman from './pages/Hangman.jsx'
import Sudoku from './pages/Sudoku.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="pages">
          <Route path="Home" element={<Home />} />
            <Route path="Tic_Tac_Toe" element={<Tic_Tac_Toe />} />
            <Route path="Hangman" element={<Hangman />} />
            <Route path="Sudoku" element={<Sudoku />} />
            <Route
              path="*"
              element={
                <main>
                  <p>404 - No existe la ruta!</p>
                </main>
              }
            ></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);