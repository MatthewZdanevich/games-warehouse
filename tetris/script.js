/* ---------- CONSTANTS ---------- */

const configuration = {
    rows: 20,
    columns: 10,
    names: ["I", "J", "L", "O", "S", "T", "Z"],
    matrices: {
        "I": [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        "J": [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        "L": [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        "O": [
            [1, 1],
            [1, 1]
        ],
        "S": [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        "T": [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        "Z": [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ]
    }
}

/* ---------- CLASS TETRIS ---------- */

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
            case "down": this.tetramino.row++; break;
            case "right": this.tetramino.column++; break;
            case "left": this.tetramino.column--; break;
        }
    
        if (!this.grid.isMovable(this.tetramino)) {
            this.tetramino.row = (direction === "down" ? row : this.tetramino.row);
            this.tetramino.column = (direction !== "down" ? column : this.tetramino.column);
            
            if (direction === "down") {
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
    
        if (!this.grid.isMovable(this.tetramino)) this.tetramino.matrix = originalMatrix;
    
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
        alert("Game over");
        location.reload();
    }

}

/* ---------- CLASS TETRAMINO ---------- */

class Tetramino {

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

/* ---------- CLASS GRID ---------- */

class Grid {

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = Array(configuration.rows).fill().map(() => Array(configuration.columns).fill(0));
        this.cells = document.querySelectorAll("#grid>div");
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
        if (!this.isPlaceable(tetramino)) return gameOver();

        tetramino.matrix.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell) {
                    this.matrix[tetramino.row + rowIndex][tetramino.column + columnIndex] = tetramino.name; 
                }
            });
        });
    
        this.clearFullLines();
    }

    clearFullLines() {
        this.matrix.forEach((row, rowIndex) => {
            if (!row.includes(0)) {
                this.matrix.splice(rowIndex, 1);
                this.matrix.unshift(new Array(10).fill(0));
            }
        })
    }
}

const tetris = new Tetris(configuration);
tetris.startGame();