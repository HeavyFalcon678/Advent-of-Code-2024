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

let regexX = /XMAS/g;
let regexY = /SAMX/g;

// match all the horizontal XMAS's
input.forEach(e => {
    let matchesX = [...e.matchAll(regexX)];
    let matchesY = [...e.matchAll(regexY)];
    finalNumber += matchesX.length;
    finalNumber += matchesY.length;
});


// this goes through each line
for (let i = 0; i < input.length; i++) {
    // go through each letter, needs 3 different loops so it doesn't wrap around
    // This is how the next lines work
    //X---
    //-M--
    //--A-
    //---S
    // is the same as 
    // X----M----A----S
    // so this diagonal is every fifth letter
    // it provides a constant that's passed into the findXMAS function to give the output

    for (let j = 0; j < len - 3; j++) {
        let diagonalLeft = [j, j + 1 + len, j + 2 + (len * 2), j + 3 + (len * 3)];
        finalNumber += findXMAS(diagonalLeft, i) === "XMAS";
        finalNumber += findXMAS(diagonalLeft, i) === "SAMX";
    }

    for (let j = 3; j < len; j++) {
        let diagonalRight = [j, j - 1 + len, j - 2 + (len * 2), j - 3 + (len * 3)];
        finalNumber += findXMAS(diagonalRight, i) === "XMAS";
        finalNumber += findXMAS(diagonalRight, i) === "SAMX";
    }

    for (let j = 0; j < len; j++) {
        let vertical = [j, j + len, j + (len * 2), j + (len * 3)];
        finalNumber += findXMAS(vertical, i) === "XMAS";
        finalNumber += (findXMAS(vertical, i) === "SAMX");
    }
}


// This function basically maps the positions the letters should be in to the letters in the index and returns them
function findXMAS(array, i) {
    let longInput = input[i] + input[i + 1] + input[i + 2] + input[i + 3];
    let [x, m, a, s] = array;
    [x, m, a, s] = [longInput[x], longInput[m], longInput[a], longInput[s]];
    return x+m+a+s;
}

console.log(finalNumber);