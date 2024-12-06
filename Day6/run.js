const library = require('fs').readFileSync("input", "utf-8").split("\n");

let direction = "up";
let pos = findStart(library, direction)
library[pos[1]][pos[0]] = "."

function findStart(library, direction) {
    for (let sy = 0; sy < library.length; sy++) {
        const line = library[sy];
        const sx = line.indexOf("^");
        if (sx >= 0) {
            return [sx, sy];
        }
    }
}

function turn() {
    switch (direction) {
        case "up":
            return "right";
        case "right":
            return "down";
        case "down":
            return "left";
        case "left":
            return "up";
    }
}

function move(pos, direction) {
    switch (direction) {
        case "up":
            pos[1] -= 1;
            break;
        case "down":
            pos[1] += 1;
            break
        case "left":
            pos[0] -= 1;
            break
        case "right":
            pos[0] += 1;
    }
    return pos
}

function run() {
    let exit = null
    let visited = new Set()
    let previous = [...pos]
    while (exit == null) {
        if (pos[0] < 0 || pos[1] < 0 || pos[0] >= library[0].length || pos[1] >= library.length-1) {
            exit = true
        } else if ((library[pos[1]] ||[])[pos[0]] === "#") {
            pos = previous
            direction = turn(direction)
        } else {
            visited.add(pos.join(","))
        }
        previous = [...pos]
        pos = move(pos, direction)
    }
    return visited.size
}

console.log("visited", run())
