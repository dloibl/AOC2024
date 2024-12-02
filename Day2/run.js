const fs = require('fs')

let matrix = []
fs.readFileSync("input", "utf-8").trim().split(/\r?\n/).forEach(line => {
    const row = line.trim().split(/\s+/).map(Number)
    matrix.push(row)
});


function isSafe(report) {
    let sign =  Math.sign(report[1] - report[0]);
    for (let j = 0; j < report.length - 1; j++) {
        const level = report[j];
        const nextLevel = report[j + 1];
        if (Math.abs(nextLevel - level) > 3 || level === nextLevel || Math.sign(nextLevel - level) !== sign) {
            return false
        }
    }
    return true;
}

function removeIndex(array, index) {
    return array.filter((_, i) => i !== index)
}

function solvePart1(reports = matrix) {
    let numberOfValidReports = 0;
    for (let report of reports) {
        if (isSafe(report)) {
            numberOfValidReports++;
        }
    }
    console.log("the answer is: ", numberOfValidReports)
}

function safeWithDampener(report = []) {
    for (let i = 0; i < report.length; i++) {
        if (isSafe(removeIndex(report, i))) {
            return true
        }
    }
    return false
}

function solvePart2(reports = matrix) {
    let numberOfValidReports = 0;
    for (let report of reports) {
        if (isSafe(report) || safeWithDampener(report)) {
            numberOfValidReports++;
        }
    }
    console.log("the answer to part 2 is: ", numberOfValidReports)
}

solvePart1()
solvePart2()
