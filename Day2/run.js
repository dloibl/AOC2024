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
        if (Math.abs(nextLevel - level) > 3 || level === nextLevel) {
            return false;
        }
        if( Math.sign(nextLevel - level) !== sign){
            return false
        }
    }
    return true;
}

function solve(reports = matrix) {
    let numberOfValidReports = 0;
    for (let report of reports) {
        if (isSafe(report)) {
            console.log(report)
            numberOfValidReports++;
        }
    }
    console.log("the answer is: ", numberOfValidReports)
}

solve()
