/* ---------- MAIN SCRIPT ---------- */

import { configuration } from "./constants.js";
import { Tetris } from "./tetris.js";

const tetris = new Tetris(configuration);
tetris.startGame();