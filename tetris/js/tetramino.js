/* ---------- TETRAMINO ---------- */

export class Tetramino {

    constructor(name, matrix) {
        this.name = name;
        this.matrix = matrix;
        this.row = -3;
        this.column = 3;
    }

    rotate() {
        this.matrix = this.matrix[0].map((_, colIndex) =>
            this.matrix.map(row => row[colIndex]).reverse()
        );
    }

}