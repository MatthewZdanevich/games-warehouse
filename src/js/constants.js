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

module.exports = configuration;