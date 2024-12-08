const equations = require('fs').readFileSync("input", "utf-8").trim().split("\n");

function solve() {
    let correct = 0;
    let sum = 0;
    for (let eq of equations) {
        const [left, right] = eq.split(": ")
        const result = Number(left)
        const operands = right.trim().split(" ").map(Number)

        if (solvable(operands, result)) {
            sum += result;
            correct++
        }
    }
    return sum
}

const add = (ops) => ops[0] + ops[1]
const mult = (ops) => ops[0] * ops[1]
const concat = (ops) => Number("" + ops[0] + ops[1])

function solvable(ops, result) {
    if (ops.length === 1) {
        return ops[0] === result;
    }
    if (ops.length === 2) {
        return add(ops) === result || mult(ops) === result || concat(ops) === result
    }
    const next = ops.slice(0, 2);
    const tail = ops.slice(2)
    return solvable([add(next), ...tail], result) ||
        solvable([mult(next), ...tail], result) ||
        solvable([concat(next), ...tail], result)
}

console.log("correct:", solve())
