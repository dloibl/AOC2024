const lines = require('fs').readFileSync("input", "utf-8").split("\n");

const xmas = /X[\s\S]*?M[\s\S]*?A[\s\S]*?S/g

const vertical_lines = []
for (let i = 0; i < lines[0].length; i++) {
    vertical_lines.push(lines.map(line => line[i]).join())
}

const diagonal_lines = []
for (let j = 0; j < lines.length; j++) {
    let line = []
    let line_down = []
    for (let i = 0; i < lines.length - j - 1; i++) {
        line.push(lines[i][i + j]);
        line_down.push((lines[i+j+1] || [])[i]);
    }
    if (line.length) {
        diagonal_lines.push(line.join())
    }
    if (line_down.length) {
        diagonal_lines.push(line_down.join())
    }
}

function countXmas(data) {
    const horizontal = data;
    const backwards = [...data].reverse().join("");
    return (horizontal.match(xmas)?.length || 0) + (backwards.match(xmas)?.length || 0)
}

const count = [...lines, ... vertical_lines, ...diagonal_lines]
    .map(countXmas)
    .reduce((a,b) => a+b)

console.log("part1", count)

