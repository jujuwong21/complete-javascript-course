'use strict';

// GAME OVERVIEW: Guess a number between 1-20, check to see whether you are too high/too low/correct

// SECTION: Helper Functions
const createSecretNumber = function () {
  return Math.trunc(20 * Math.random()) + 1;
};

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// SECTION: Define and Initialize Variables
let secretNumber = createSecretNumber();
let score = 20;
let highscore = 0;

// SECTION: Events and actions
// use textContent for elements, value for stuff requiring inputs
console.log(document.querySelector('.message').textContent);
console.log(document.querySelector('.guess').value);

// When person hits the check button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // evaluated to a boolean, falsey value (no input)
  if (!guess) {
    displayMessage('Please input a number');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = secretNumber;
    // makes box around question mark/number bigger
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guess is not equal
  } else {
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
      displayMessage(guess > secretNumber ? 'Too high 📈' : 'Too low 📉');
    } else {
      displayMessage('Game Over! 😰');
    }
  }
});

// When someone hits the again button: (Coding Challenge)
document.querySelector('.again').addEventListener('click', function () {
  // initialize score and secretNumber
  score = 20;
  secretNumber = createSecretNumber();

  // reset values/text/style on screen
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
});
