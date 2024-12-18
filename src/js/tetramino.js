/* ---------- TETRAMINO ---------- */

const logger = require('./logger.js');

class Tetramino {

    constructor(name, matrix) {
        this.name = name;
        this.matrix = matrix;
        this.row = -3;
        this.column = 3;
        logger.info(`A new tetramino has been created: "${name}"`);
    }

    rotate() {
        logger.debug({ originaMatrix: this.matrix });
        
        this.matrix = this.matrix[0].map((_, colIndex) =>
            this.matrix.map(row => row[colIndex]).reverse()
        );

        logger.debug({ invertedMatrix: this.matrix });
        logger.info("Tetramino was rotated");
    }

}

module.exports = Tetramino;