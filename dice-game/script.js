const listOfAllDice = document.querySelectorAll('.die')
const scoreInputs = document.querySelectorAll('#score-options input')
const scoreSpans = document.querySelectorAll('#score-options span')

const currentRoundText = document.getElementById('current-round')
const currentRoundRollsText = document.getElementById('current-round-rolls')
const totalScoreText = document.getElementById('total-score')
const scoreHistory = document.getElementById('score-history')
const rollDiceBtn = document.getElementById('roll-dice-btn')
const keepScoreBtn = document.getElementById('keep-score-btn')

const rulesContainer = document.querySelector('.rules-container')

const rulesBtn = document.getElementById('rules-btn')

let isModalShowing = false;
let diceValuesArr = []
let rolls = 0;
let score = 0;
let totalScore = 0;
let round = 1;

rulesBtn.addEventListener('click', () => {})