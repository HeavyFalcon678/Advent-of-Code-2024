// import filesystem
const fs = require("node:fs");

// test with example input 
const debug = false;
let input;

// Get the input; if in debug mode use example input, else use the actual input
if (!debug) {
    input = fs.readFileSync("input.txt", "utf-8");
} else {
    input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;    
}

// regex to match the command
const regex = /(?:mul\((\d+),(\d+)\))|(?:do\(\))|(?:don't\(\))/g;
const output = [...input.matchAll(regex)];

let enable = true;

// reduce with the captured numbers
let finalNumber = output.reduce((acc, value, index) => {
    if (output[index][0][0] == "d") {
        output[index][0][2] == "n" ? enable = false : enable = true;
    } else {
        enable == true && (acc += (output[index][1] * output[index][2]));
    }
    return acc;
}, 0);

console.log(finalNumber);