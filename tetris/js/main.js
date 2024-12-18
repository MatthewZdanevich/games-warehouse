/* ---------- MAIN SCRIPT ---------- */

const logger = require('../../logger.js');
const Tetris = require('./tetris.js');
const configuration = require('./constants.js');

logger.info("Starting Tetris");

const tetris = new Tetris(configuration);
tetris.startGame();