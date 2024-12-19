/* ---------- MAIN SCRIPT ---------- */

const logger = require('./logger.js');
const Tetris = require('./tetris.js');
const configuration = require('./constants.js');

const startGameButton = document.querySelector(".start-game-button");
const loadGameButton = document.querySelector(".load-progress-button");

function startGameHandler() {
    logger.info("Starting Tetris");
    
    const tetris = new Tetris(configuration);
    tetris.startGame();

    startGameButton.classList.add("disabled");
    loadGameButton.classList.add("disabled");
    startGameButton.removeEventListener('click', startGameHandler);
    loadGameButton.removeEventListener('click', loadGameHandler);
}

function loadGameHandler() {
    logger.info("Loading Tetris");

    const savedState = JSON.parse(localStorage.getItem("tetrisGameState"));
    logger.debug(savedState);

    const tetris = new Tetris(configuration);
    tetris.loadGame(savedState.score, savedState.grid);

    startGameButton.classList.add("disabled");
    loadGameButton.classList.add("disabled");
    startGameButton.removeEventListener('click', startGameHandler);
    loadGameButton.removeEventListener('click', loadGameHandler);
}

startGameButton.addEventListener('click', startGameHandler);
loadGameButton.addEventListener('click', loadGameHandler);