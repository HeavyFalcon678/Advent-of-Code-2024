// import filesystem
const fs = require("node:fs");

// test with example input 
const debug = false;
let input;

// Get the input; if in debug mode use example input, else use the actual input
if (!debug) {
    input = fs.readFileSync("input.txt", "utf-8");
} else {
    input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;    
}


const regex = /mul\((\d+),(\d+)\)/g;
const output = [...input.matchAll(regex)];


let finalNumber = output.reduce((acc, value, index) => {
    return acc + (output[index][1] * output[index][2]);
}, 0);

console.log(finalNumber);