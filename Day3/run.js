const program = require('fs').readFileSync("input", "utf-8")

const pattern = /mul\((\d{1,3}),(\d{1,3})\)/
const doPattern = /don't\(\)[\s\S]*?do\(\)/g

function mullItOver(input) {
    const matches = input.match(new RegExp(pattern, "g"));
    let result = 0;
    for (match of matches) {
        const [_, a, b] = match.match(pattern);
        result += a * b;
    }
    return result;
}

console.log("part1", mullItOver(program))
console.log("part2", mullItOver(program.replace(doPattern, "")))

