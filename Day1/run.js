const fs = require('fs')

let one = []
let two = []
fs.readFileSync("input", "utf-8").split(/\r?\n/).forEach(line => {
    const [a, b] = line.trim().split(/\s+/)
    one.push(Number(a))
    two.push(Number(b))
  });

function solve(list1 = [], list2 = []){
    list1.sort();
    list2.sort();

    const result = list1.reduce((acc, next,index) => {
        acc += Math.abs(next - list2[index])
        return acc;
    }, 0)

    console.log("the answer is", result)
}

function countOccurrences(list = []) {
    return list.reduce((acc, next) => {
        if (acc.has(next)) {
            acc.set(next, acc.get(next) + 1)
        } else {
            acc.set(next, 1)
        }
        return acc
    }, new Map())
}

function solve2(list1 = [], list2 = []) {
    const map1 = countOccurrences(list1.sort())
    const map2 = countOccurrences(list2.sort())

    let result = 0;
    for (let [key, value] of map1) {
        result += key * value * map2.get(key) || 0;
    }
    console.log("the answer two part 2 is:", result)
}

solve2(one, two)
