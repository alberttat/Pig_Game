'use strict';

const player1Score = document.getElementById('score--0');
const player2Score = document.getElementById('score--1');

const diceRollButton = document.querySelector('.btn--roll');
const newGameButton = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');

const currentHoldPlayer1 = document.getElementById('current--0');
const currentHoldPlayer2 = document.getElementById('current--1');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const dicePNG = document.querySelector('.dice');

dicePNG.classList.add('hidden');

let currentDiceScore = 0; //current score for current player
let currentPlayer1Score = 0;
let currentPlayer2Score = 0;
let currentPlayer = 0; // player 1 or 2's turn
let playing = true;

newGame();

diceRollButton.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        dicePNG.classList.remove('hidden');
        dicePNG.src = `dice-${dice}.png`;
        currentDiceScore += dice;

        if (dice === 1) {
            swapPlayer();
        }
        else {
            if (currentPlayer === 0) {
                currentHoldPlayer1.textContent = currentDiceScore;
            }
            else {
                currentHoldPlayer2.textContent = currentDiceScore;
            }
        }
    }
})

holdButton.addEventListener('click', function () {
    if (playing) {
        if (currentPlayer === 0) {
            currentPlayer1Score += currentDiceScore;
            player1Score.textContent = currentPlayer1Score;
        }
        else {
            currentPlayer2Score += currentDiceScore;
            player2Score.textContent = currentPlayer2Score;
        }
        if (currentPlayer1Score >= 100) {
            player1.classList.add('player--winner');
            playing = false;
        }
        if (currentPlayer2Score >= 100) {
            player2.classList.add('player--winner');
            playing = false;
        }
        swapPlayer();
    }
})

newGameButton.addEventListener('click', newGame);

function newGame() {
    playing = true;
    currentDiceScore = 0; //current score for current player
    currentPlayer1Score = 0;
    currentPlayer2Score = 0;
    currentPlayer = 0; // player 1 or 2's turn
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    currentHoldPlayer1.textContent = 0;
    currentHoldPlayer2.textContent = 0;
    dicePNG.classList.add('hidden');
    player1.classList.add('player--active');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--active');
    player2.classList.remove('player--winner');
}

function swapPlayer() {
    currentDiceScore = 0;
    if (currentPlayer === 0) {
        player1.classList.toggle('player--active');
        player2.classList.toggle('player--active');
        currentPlayer = 1;
        currentHoldPlayer1.textContent = currentDiceScore;
    }
    else {
        player1.classList.toggle('player--active');
        player2.classList.toggle('player--active');
        currentPlayer = 0;
        currentHoldPlayer2.textContent = currentDiceScore;
    }
}
