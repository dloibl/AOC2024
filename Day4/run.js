const lines = require('fs').readFileSync("input", "utf-8").split("\n");


const safeGet = (x, y) => (lines[x] || [])[y]

function searchXmas(i, j, x, y) {
    if (safeGet(i + x, j + y) === "M" &&
        safeGet(i + 2 * x, j + 2 * y) === "A" &&
        safeGet(i + 3 * x, j + 3 * y) === "S") {
        return true
    }
}

function searchCross(i, j) {
    if ((safeGet(i - 1, j - 1) === "M" && safeGet(i + 1, j + 1) === "S" ||
            safeGet(i - 1, j - 1) === "S" && safeGet(i + 1, j + 1) === "M") &&
        (safeGet(i - 1, j + 1) === "S" && safeGet(i + 1, j - 1) === "M" ||
            safeGet(i - 1, j + 1) === "M" && safeGet(i + 1, j - 1) === "S")
    ) {
        return true;
    }
}

let countXmas = 0;
let countCross = 0;
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
        if (lines[i][j] === "X") {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (searchXmas(i, j, dx, dy)) {
                        countXmas++
                    }
                }
            }
        }
        if (lines[i][j] === "A") {
            if (searchCross(i, j)) {
                countCross++;
            }
        }
    }
}

console.log("part1", countXmas)
console.log("part2", countCross)
