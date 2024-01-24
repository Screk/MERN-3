import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div>
      <h2>Elige uno de nuestros juegos ⤴</h2>
      <article>
        <section className='firstSection'>
          <img src="/Tic_tac_toe.svg.png" alt="" />
          <div>
            <h3>3 EN RAYA</h3>
            <h4>Juego de mesa para dos personas en que gana el primero en poner tres marcas en línea, usualmente círculos y cruces, dentro de una cuadrícula de tres casillas de ancho por tres de alto.</h4>
          </div>
        </section>
        <section className='firstSection'>
          <img src="/ahorcado.jpg" alt="" />
          <div>
            <h3>AHORCADO</h3>
            <h4>Consiste en adivinar una palabra en el menor número de intentos posibles. Primero se deben marcar tantas rayas como letras tenga la palabra pensada. Los jugadores tendrán que ir diciendo letras para formar la palabra Se dibuja una horca y los jugadores van diciendo letras.</h4>
          </div>
        </section>
        <section className='firstSection'>
          <img src="/sudoku.jpg" alt="" />
          <div>
            <h3>SUDOKU</h3>
            <h4> Se trata de un rompecabezas matemático cuyo objetivo es rellenar una cuadrícula de 9×9 celdas dividida en subcuadrículas de 3×3 con las cifras del 1 al 9 partiendo de algunos números ya dispuestos en algunas de las celdas.</h4>
          </div>
        </section>
      </article>
    </div>
  )
}

export default Home