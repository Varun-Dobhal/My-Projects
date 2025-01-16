'use strict';

let num = Math.trunc(Math.random() * 3 + 1);
let score = 20;
let high = 0;

// Guessing number.
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);
  if (!guess) {
    document.querySelector('.message').textContent = 'No Number';
  } else if (guess === num) {
    document.querySelector('.message').textContent = 'Correct Guess';
    document.querySelector('.h1').textContent = 'Wooooooo!!!';
    document.querySelector('body').style.backgroundColor = '#1F4D29';
    score++;
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = guess;
    document.querySelector('.number').style.width = '30rem';

    if (score > high) {
      high = score;
      document.querySelector('.highscore').textContent = high;
    }
  } else if (guess !== num) {
    if (score > 0) {
      document.querySelector('.message').textContent = 'Wrong Guess';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'Game Over';
    }
  }
});

// Again Buttton
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  num = Math.trunc(Math.random() * 3);
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#101d2c';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  document.querySelector('.h1').textContent = 'Guess It!';
});
