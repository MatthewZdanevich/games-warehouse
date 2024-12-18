/* ---------- MAIN SCRIPT ---------- */

const Tetris = require('./tetris.js');
const configuration = require('./constants.js');

const tetris = new Tetris(configuration);
tetris.startGame();