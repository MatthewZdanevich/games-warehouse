/* ---------- GRID ---------- */

const logger = require('../../logger.js');
const configuration = require('./constants.js');

class Grid {

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = Array(configuration.rows).fill().map(() => Array(configuration.columns).fill(0));
        this.cells = document.querySelectorAll("#grid>div");
        logger.info(`The ${rows} by ${columns} grid was created`);
    }

    isMovable(tetramino) {
        return tetramino.matrix.every((row, rowIndex) => {
            return row.every((cell, columnIndex) => {
                if (!cell) return true;
    
                const newRow = tetramino.row + rowIndex;
                const newColumn = tetramino.column + columnIndex;
    
                return (
                    newRow < this.rows &&
                    newColumn >= 0 &&
                    newColumn < this.columns &&
                    (newRow < 0 ? true : this.matrix[newRow][newColumn] === 0)
                );
            });
        });
    }

    isPlaceable(tetramino) {
        return tetramino.matrix.every((row, rowIndex) => {
            return row.every((cell, columnIndex) => {
                if (!cell) return true;
                return (!(tetramino.row + rowIndex < 0));
            });
        });
    }

    placeTetramino(tetramino, gameOver) {
        if (!this.isPlaceable(tetramino)) {
            logger.info(`Unable to place the tetramino "${tetramino.name}"`);
            return gameOver();
        }

        tetramino.matrix.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell) {
                    this.matrix[tetramino.row + rowIndex][tetramino.column + columnIndex] = tetramino.name; 
                }
            });
        });

        logger.debug({ gridMatrix: this.matrix });
        logger.info(`Tetramino "${tetramino.name}" was placed on the grid`);
    
        this.clearFullLines();
    }

    clearFullLines() {
        this.matrix.forEach((row, rowIndex) => {
            if (!row.includes(0)) {
                this.matrix.splice(rowIndex, 1);
                this.matrix.unshift(new Array(10).fill(0));

                logger.debug({ deletedLineIndex: rowIndex });
                logger.debug({ gridMatrix: this.matrix });
                logger.info("One line has been cleared");
            }
        })
    }
}

module.exports = Grid;