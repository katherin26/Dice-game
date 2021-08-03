'use strict';

//SELECTING ELEMENTS.

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//-------------------------------------------------
const score0El = document.querySelector('#score--0'); //cuando se usa queryselector se indica el # porque es un id.
const score1El = document.getElementById('score--1'); //cuando se elije por id solo se coloca el nombre de id.
//--------------------------------------------------
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//--------------------------------------------------
const diceEl = document.querySelector('.dice');
//--------------------------------------------------
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; //scoping = queremos que estas variables vivan afuera y usar los values dentro de la funcion.

//STARTING CONDITIONS.

const init = function () {
  scores = [0, 0]; // este score es el finalscore que se acumulan al final .
  currentScore = 0;
  activePlayer = 0;
  playing = true; // esto es cuando se inicia el juego osea que false es cuando se termina.

  score0El.textContent = 0; //javascript cambia esto a string.
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); // esto esconde el dado.
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); //se deja add porque 0 siempre inicia.
  player1El.classList.remove('player--active');
};
init(); //esto inicializa los valores.

const switchPlayer = function () {
  // No se usa parametros porque solo estamos repitiendo codigo , pero si en el proyecto hubiera algo que cambie se define el parametro y asi se retorna dependiendo el caso.
  document.getElementById(`current--${activePlayer}`).textContent = 0; // cuando el dado quede en 1 el current value se quedara en 0 y  se ejecuta el ternary operation.
  activePlayer = activePlayer === 0 ? 1 : 0; // aqui estamos reasignando el activePlayer y comprobamos si el jugador es 0 sera uno .
  currentScore = 0; //esto vuelve el currentScore otra vez a 0.
  player0El.classList.toggle('player--active'); //el toggle quita y pone el color de fondo.
  player1El.classList.toggle('player--active');
};

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    // si se esta jugando estonces se ejecuta lo de abajo. y se bloquea el juego.
    //1. GENERATING RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1; // math random da decimales , math trunc quita los decimales y se agrega uno para que sea 6.
    console.log(dice);
    //2. DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`; // 'dice-4.png'de esta manera dinamicamente el dado pasa de 1 a 4 a 3 etc...

    //3.CHECK FOR ROLLED 1 : IF TRUE ,

    if (dice !== 1) {
      //ADD DICE TO CURRENT SCORE
      //currentScore = currentScore + dice;
      currentScore += dice; // cuando el dado no es uno entonces se agrega a current Score
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; // esto cambia el jugador de manera dinamica.
      //current0El.textContent = currentScore; // change later!!
    } else {
      //SWITCH TO NEXT PLAYER.// pero si sacamos uno entonces perdemos todo nuestra puntuacion .
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player's score.
    scores[activePlayer] += currentScore; // esto se agrega a la varibale scores que es un array y seria el score total.
    //score[1] = score[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if player's score is >= 100.
    if (scores[activePlayer] >= 20) {
      //FInish the game .
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player.
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init); // se pone init en vez de function();
