'use strict';

// SECTION: Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1'); // same idea as querySelector
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// SECTION: Initialize Values
let totalScores, currentScore, activePlayer, playing;
const resetValues = function () {
  totalScores = [0, 0];
  activePlayer = 0;
  playing = true;
  currentScore = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
};
resetValues();

// SECTION: Helper function
// Changes which player is active, resets current value, and changes background
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// SECTION: Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate a random dice roll
    const diceValue = Math.trunc(Math.random() * 6) + 1;

    // display dice (change source of image)
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceValue}.png`;

    // check for a roll of 1: if true, switch to next player, if false add to current score
    if (diceValue !== 1) {
      // add dice to current score
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch players (+ background), reset current score
      switchPlayer();
    }
  }
});

// SECTION: Holding Current Score
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's score
    totalScores[activePlayer] += currentScore;
    console.log(totalScores);
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // if score > 100, finish game, if not switch to next player
    if (totalScores[activePlayer] >= 100) {
      playing = false; // game over
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// SECTION: New Game
btnNew.addEventListener('click', resetValues);
