/* ---------- TETRIS ---------- */

const logger = require('../../logger.js')
const Grid = require('./grid.js');
const Tetramino = require('./tetramino.js');
const configuration = require('./constants.js');

class Tetris {

    constructor(configuration) {
        this.rows = configuration.rows;
        this.columns = configuration.columns;
        this.names = configuration.names;
        this.matrices = configuration.matrices;

        this.tetramino = undefined;
        this.grid = undefined;

        this.timeoutId = undefined;
        this.requestId = undefined;

        logger.info(`The object of a Tetris game with a ${this.rows} x ${this.columns} configuration was created`);
    }

    // TETRAMINO LOGIC

    generateTetramino() {
        const name = this.names[Math.floor(Math.random() * this.names.length)];
        const matrix = this.matrices[name];
        this.tetramino = new Tetramino(name, matrix);
    }

    moveTetramino(direction) {
        const { row, column } = this.tetramino;

        switch(direction) {
            case "down":
                this.tetramino.row++;
                logger.info("Moving the tetramino down");
                break;
            case "right":
                this.tetramino.column++;
                logger.info("Moving the tetramino right");
                break;
            case "left":
                this.tetramino.column--;
                logger.info("Moving the tetramino left");
                break;
        }
    
        if (!this.grid.isMovable(this.tetramino)) {
            logger.info("Movement is blocked");
            this.tetramino.row = (direction === "down" ? row : this.tetramino.row);
            this.tetramino.column = (direction !== "down" ? column : this.tetramino.column);
            
            if (direction === "down") {
                logger.info("Tetramino has reached the lower limit");
                this.grid.placeTetramino(this.tetramino, this.stopGame);
                this.generateTetramino();
            }
        }
    
        this.renderGrid();
        this.renderTetramino();
    
        if (direction === "down") {
            this.stopLoop();
            this.startLoop();
        }
    }

    rotateTetramino() {
        const originalMatrix = this.tetramino.matrix;
        this.tetramino.rotate();
    
        if (!this.grid.isMovable(this.tetramino)) {
            this.tetramino.matrix = originalMatrix;
            logger.info("Rotation is not possible");
            logger.info("Tetramino is back to his original position");
        }
    
        this.renderGrid();
        this.renderTetramino();
    }

    // RENDER LOGIC

    renderTetramino() {
        this.tetramino.matrix.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell && this.tetramino.row + rowIndex >= 0) {
                    const index = (this.tetramino.row + rowIndex) * this.columns + (this.tetramino.column + columnIndex);
                    this.grid.cells[index].classList.add(this.tetramino.name);
                }
            });
        });
    }

    renderGrid() {
        this.grid.cells.forEach(cell => cell.removeAttribute("class"));
        this.grid.matrix.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell) {
                    const index = rowIndex * this.columns + columnIndex;
                    this.grid.cells[index].classList.add(cell);
                }
            })
        })
    }

    // LOOP LOGIC

    startLoop() {
        this.timeoutId = setTimeout(() => {
            this.requestId = requestAnimationFrame(() => this.moveTetramino("down"));
        }, 600);
    }

    stopLoop() {
        cancelAnimationFrame(this.requestId);
        clearTimeout(this.timeoutId);
    }

    // GAME LOGIC

    startGame() {
        logger.info("The game is up and running");

        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "ArrowUp": this.rotateTetramino(); break;
                case "ArrowDown": this.moveTetramino("down"); break;
                case "ArrowLeft": this.moveTetramino("left"); break;
                case "ArrowRight": this.moveTetramino("right"); break;
            }
        });

        this.grid = new Grid(this.rows, this.columns);
        this.generateTetramino();
        this.renderGrid();
        this.renderTetramino();

        this.startLoop();
    }

    stopGame() {
        logger.info("The game is over");
        alert("Game over");
        location.reload();
    }

}

module.exports = Tetris;