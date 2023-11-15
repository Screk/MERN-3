import './App.css'
import { Outlet, NavLink } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <header>
          <h1>Nuestros juegos</h1>
          <div className='juegos'>
            <NavLink className='NavLink' to='/pages/Home'>
              Home
            </NavLink>
            <NavLink className='NavLink' to='/pages/Tic_Tac_Toe'>
              3 en Raya
            </NavLink>
            <NavLink className='NavLink' to='/pages/Hangman'>
              Ahorcado
            </NavLink>
            <NavLink className='NavLink' to='/pages/Sudoku'>
              Sudoku
            </NavLink>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <h3>Created by: Jorge Pérez Requena</h3>
        </footer>
      </div>
    </>
  )
}

export default App
