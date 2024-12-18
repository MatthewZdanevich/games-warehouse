/* ---------- TETRIS TESTS ---------- */

jest.mock('pino', () => () => ({
    fatal: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
}));

const configuration = require('../tetris/js/constants');
const Grid = require('../tetris/js/grid');
const Tetramino = require('../tetris/js/tetramino');
const Tetris = require('../tetris/js/tetris');

/* ---------- CONFIGURATION OBJECT ---------- */

describe("Testing configuration object", () => {
    test("Configuration should contain the required number of rows and columns", () => {
        expect(configuration.rows).toBe(20);
        expect(configuration.columns).toBe(10);
    });

    test("Configuration should contain tetromino codes and their matrices", () => {
        for (let element of configuration.names) {
            expect(configuration.matrices[element]).toBeDefined();
        }
    });
});

/* ---------- GRID CLASS ---------- */

describe("Testing grid class", () => {
    test("Grid should be initialized correctly", () => {
        const grid = new Grid(configuration.rows, configuration.columns);
        expect(grid.rows).toBe(configuration.rows);
        expect(grid.columns).toBe(configuration.columns);
        expect(grid.matrix.every(row => row.every(cell => cell === 0))).toBeTruthy();
        expect(grid.cells).toBeDefined();
    });

    test("Grid should handle tetromino render correctly", () => {
        const grid = new Grid(configuration.rows, configuration.columns);
        const tetramino = new Tetramino("T", configuration.matrices["T"]);

        expect(grid.isMovable(tetramino)).toBeTruthy();

        tetramino.row = 8;
        tetramino.column = 4;
        expect(grid.isMovable(tetramino)).toBeTruthy();

        tetramino.row = 8;
        tetramino.column = -4;
        expect(grid.isMovable(tetramino)).toBeFalsy();
    });

    test("Grid should handle tetromino placement correctly", () => {
        const grid = new Grid(configuration.rows, configuration.columns);
        const tetramino = new Tetramino("T", configuration.matrices["T"]);
        
        expect(grid.isPlaceable(tetramino)).toBeFalsy();

        tetramino.row = 8;
        tetramino.column = 4;
        expect(grid.isPlaceable(tetramino)).toBeTruthy();

        tetramino.row = 18;
        tetramino.column = 0;
        grid.placeTetramino(tetramino, "Game over");
        expect(grid.matrix[18]).toContain("T");
        expect(grid.matrix[19]).toContain("T");
    });

    test("Grid should correctly handle the filled rows", () => {
        const grid = new Grid(configuration.rows, configuration.columns);
        
        grid.matrix[19] = grid.matrix[19].fill(1);
        expect(grid.matrix[19].every(cell => cell === 1)).toBeTruthy();

        grid.clearFullLines();
        expect(grid.matrix[19].every(cell => cell === 0)).toBeTruthy();
    });
});

/* ---------- TETRAMINO CLASS ---------- */

describe("Testing tetramino class", () => {
    test("Tetramino should be initialized correctly", () => {
        const tetramino = new Tetramino("T", configuration.matrices["T"]);
        expect(tetramino.name).toBe("T");
        expect(tetramino.matrix).toBe(configuration.matrices["T"]);
        expect(tetramino.row).toBe(-3);
        expect(tetramino.column).toBe(3);
    });

    test("Tetromino should handle rotation correctly", () => {
        const tetramino = new Tetramino("T", configuration.matrices["T"]);

        tetramino.rotate();
        expect(tetramino.matrix).toEqual([
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ]);
    });
});

/* ---------- TETRIS CLASS ---------- */

describe("Testing tetris class", () => {
    test("Tetris should be initialized correctly", () => {
        const tetris = new Tetris(configuration);
        tetris.startGame();

        expect(tetris.rows).toBe(configuration.rows);
        expect(tetris.columns).toBe(configuration.columns);
        expect(tetris.names).toBe(configuration.names);
        expect(tetris.matrices).toBe(configuration.matrices);
        expect(tetris.tetramino).toBeDefined();
        expect(tetris.grid).toBeDefined();
    });
});