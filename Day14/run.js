const robotsInputs = require('fs').readFileSync("input", "utf-8").trim().split("\n");

const robots = robotsInputs.map(line => {
        const [p, v] = line.replace("p=", "").split(" v=")
        return {p: p.split(",").map(Number), v: v.split(",").map(Number)};
    }
)

function mod(a, n) {
    return ((a % n) + n) % n;
}

const MX = 11
const MY = 7

function move(robot, t = 1) {
    robot.p[0] = mod(robot.p[0] + t * robot.v[0], MX)
    robot.p[1] = mod(robot.p[1] + t * robot.v[1], MY)
}

function run(t = 100) {
    for (let robot of robots) {
        move(robot, t)
    }
}

function safetyCounts() {
    let count = [0, 0, 0, 0];
    const BX = (MX - 1) / 2
    const BY = (MY - 1) / 2
    for (let robot of robots) {
        if (robot.p[0] < BX && robot.p[1] < BY) {
            count[0]++
        }
        if (robot.p[0] < BX && robot.p[1] > BY) {
            count[1]++
        }
        if (robot.p[0] > BX && robot.p[1] > BY) {
            count[2]++
        }
        if (robot.p[0] > BX && robot.p[1] < BY) {
            count[3]++
        }
    }
    return count.reduce((a, b) => a * b, 1);
}

function print() {
    let l = ""
    for (let j = 0; j < MY; j++) {
        let s = ""
        for (let i = 0; i < MX; i++) {
            if (i === (MX - 1) / 2) {
                s += "|"
            } else if (robots.find(r => r.p[0] === i && r.p[1] === j)) {
                s += "#";
            } else {
                s += " ";
            }
        }
        l += s + "\n"
    }
    return l
}

function countNeighbors() {
    let maxNeighbors = 0;
    for (let i = 0; i < robots.length; i++) {
        for (let j = i + 1; j < robots.length; j++) {
            if (Math.abs(robots[i].p[0] - robots[j].p[0]) === 1 || Math.abs(robots[i].p[1] - robots[j].p[1]) === 1) {
                maxNeighbors++;
            }
        }
    }
    return maxNeighbors;
}

function findTAfterItRepeats() {
    const startPosition = [...robots[0].p]
    let t = 1;
    while (true) {
        robots.forEach(r => move(r, 1))
        if (robots[0].p[0] === startPosition[0] && robots[0].p[1] === startPosition[1]) {
            return t
        }
        t++;
    }
}

function findChristmasTree(maxT = findTAfterItRepeats()) {
    let max = 0;
    let tt = 0;
    for (let t = 1; t < maxT; t++) {
        robots.forEach(r => move(r, 1))
        const count_n = countNeighbors()
        if (count_n > max) {
            max = count_n;
            tt = t;
        }
    }
    return tt
}

console.log("part1", safetyCounts())
console.log("part2", findChristmasTree())

// run()
// console.log(print())
