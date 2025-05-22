// import filesystem
const fs = require("node:fs");

// test with example input 
const debug = false;
let input;

// Get the input; if in debug mode use example input, else use the actual input
if (!debug) {
    input = fs.readFileSync("input.txt", "utf-8");
} else {
    input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
}

// split into lines and get the width of the string
input = input.split("\n");
let len = input[1].length

let finalNumber = 0;
const matches = ["SSAMM", "SMASM", "MSAMS", "MMASS"];

// this goes through each line
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < len - 2; j++) {
        let xmas = [j, j+2, j + len + 1, j + (len * 2), j + (len * 2) +2];
        matches.includes(findXMAS(xmas, i)) && finalNumber++;
    }
}

// This function basically maps the positions the letters should be in to the letters in the index and returns them
function findXMAS(array, i) {
    let longInput = input[i] + input[i + 1] + input[i + 2];
    let [a, b, c, d, e] = array;
    [a, b, c, d, e] = [longInput[a], longInput[b], longInput[c], longInput[d], longInput[e]];
    return a+b+c+d+e;
}

console.log(finalNumber);