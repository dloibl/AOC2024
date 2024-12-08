const map = require('fs').readFileSync("input", "utf-8").trim().split("\n");

const input = new Map()
for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
        const point = map[x][y]
        if (point === "#") {
            console.log([x,y])
        }
        if (point !== "." && point !== "#") {
            let entry = input.get(point);
            if (entry) {
                entry.push([x, y]);
            } else {
                input.set(point, [[x, y]]);
            }
        }
    }
}

const plus = (a, b) => [a[0] + b[0], a[1] + b[1]]
const minus = (a, b) => [a[0] - b[0], a[1] - b[1]]
const exists = ([x,y]) => (map[x] || [])[y] != null

function findAllAntiNodes(antennas = input) {
    const antinodes = new Set()
    function findAntiNode(p, v, fun) {
        antinodes.add(p.join(","))
        let hasNext = true
        let q = [...p];
        while (hasNext) {
            q = fun(q, v)
            hasNext = exists(q)
            if (hasNext) {
                antinodes.add(q.join(","));
            }
        }
    }

    for (let [_, values] of antennas) {
        for (let i = 0; i < values.length; i++) {
            for (let j = i + 1; j < values.length; j++) {
                const dx = values[j][0] - values[i][0];
                const dy = values[j][1] - values[i][1];
                findAntiNode(values[j], [dx, dy], plus)
                findAntiNode(values[i], [dx, dy], minus)
            }
        }
    }

    return antinodes.size
}

console.log("the answer is", findAllAntiNodes())

