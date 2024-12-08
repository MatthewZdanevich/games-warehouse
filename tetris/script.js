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

/* ---------- GRID ---------- */

let grid = Array(configuration.rows).fill().map(() => Array(configuration.columns).fill(0));
let cells = document.querySelectorAll("#grid>div");

const renderGrid = () => {
    cells.forEach(cell => cell.removeAttribute("class"));
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell) {
                const index = rowIndex * configuration.columns + columnIndex;
                cells[index].classList.add(cell);
            }
        })
    })
};

/* ---------- TETRAMINO LOGIC ---------- */

const generateTetramino = () => {
    const name = configuration.names[Math.floor(Math.random() * configuration.names.length)];
    const matrix = configuration.matrices[name];
    const row = -3 ;
    const column = 3;

    return { name, matrix, row, column };
};

const renderTetramino = () => {
    tetramino.matrix.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell && tetramino.row + rowIndex >= 0) {
                const index = (tetramino.row + rowIndex) * configuration.columns + (tetramino.column + columnIndex);
                cells[index].classList.add(tetramino.name);
            }
        });
    });
};

/* ---------- MOVEMENT LOGIC ---------- */

const moveTetramino = (direction) => {
    const { row, column } = tetramino;

    switch(direction) {
        case "down": tetramino.row++; break;
        case "right": tetramino.column++; break;
        case "left": tetramino.column--; break;
    }

    if (!isMovable()) {
        tetramino.row = (direction === "down" ? row : tetramino.row);
        tetramino.column = (direction !== "down" ? column : tetramino.column);
    }

    renderGrid();
    renderTetramino();

    if (direction === "down") {
        stopLoop();
        startLoop();
    }
}

/* ---------- COLLISION LOGIC ---------- */

const isMovable = () => {
    return tetramino.matrix.every((row, rowIndex) => {
        return row.every((cell, columnIndex) => {
            if (!cell) return true;

            const newRow = tetramino.row + rowIndex;
            const newColumn = tetramino.column + columnIndex;

            return (
                newRow < configuration.rows &&
                newColumn >= 0 &&
                newColumn < configuration.columns &&
                (newRow < 0 ? true : grid[newRow][newColumn] === 0)
            );
        });
    });
};

/* ---------- MAIN LOOP ---------- */

let timeoutId, requestId;

const startLoop = () => {
    timeoutId = setTimeout(() => {
        requestId = requestAnimationFrame(() => moveTetramino("down"));
    }, 600);
};

const stopLoop = () => {
    cancelAnimationFrame(requestId);
    clearTimeout(timeoutId);
};

/* ---------- EVENT LISTENERS ---------- */

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowDown": moveTetramino("down"); break;
        case "ArrowLeft": moveTetramino("left"); break;
        case "ArrowRight": moveTetramino("right"); break;
    }
});

/* ---------- START GAME ---------- */

let tetramino = generateTetramino();
renderGrid();
renderTetramino();
startLoop();