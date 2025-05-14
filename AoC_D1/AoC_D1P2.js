// import filesystem
const fs = require("node:fs");

// test with example input 
const debug = false;
let input;

// Get the input
// if in debug  mode use the example input, else use the actual input
if (!debug) {
    input = fs.readFileSync("input.txt", "utf-8");
} else {
    input = `3   4
4   3
2   5
1   3
3   9
3   3`;    
}

// remove extra whitespace and split into single array
input = input.replaceAll("   ", " ");
input = input.split(/\s/);

// split array into two
let arr1 = [], arr2 = [];
input.forEach((val, index) => index % 2 ? arr2.push(val) : arr1.push(val));


const totalValue = arr1.reduce((total, val, index) => {
    return total += val * arr2.reduce((ttl, x) => (val == x ? ++ttl : ttl), 0); 
}, 0);

console.log(totalValue);