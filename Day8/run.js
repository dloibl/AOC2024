const map = require('fs').readFileSync("input", "utf-8").trim().split("\n");


const antennas = new Map()
for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
        const point = map[x][y]
        if (point === "#") {
            console.log([x,y])
        }
        if (point !== "." && point !== "#") {
            let entry = antennas.get(point);
            if (entry) {
                entry.push([x, y]);
            } else {
                antennas.set(point, [[x, y]]);
            }
        }
    }
}

const plus = (a, b) => [a[0] + b[0], a[1] + b[1]]
const minus = (a, b) => [a[0] - b[0], a[1] - b[1]]
const exists = ([x,y]) => (map[x] || [])[y] != null

const antinodes = new Set()
for (let [key, values] of antennas) {
    for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
            const dx = values[j][0] - values[i][0];
            const dy = values[j][1] - values[i][1];
            const p1 = plus(values[j], [dx,dy])
            const p2 = minus(values[i], [dx,dy])
            if (exists(p1)) {
                antinodes.add(p1.join(","))
            }
            if (exists(p2)) {
                antinodes.add(p2.join(","))
            }
        }
    }
}


console.log(antinodes.size)

