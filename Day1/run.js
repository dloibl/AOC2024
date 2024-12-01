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
    },0)

    console.log("the answer is", result)
}

solve(one,two)
