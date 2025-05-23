// import filesystem
const fs = require("node:fs");

// test with example input 
const debug = true;
let input;

// Get the input; if in debug mode use example input, else use the actual input
if (!debug) {
    input = fs.readFileSync("input.txt", "utf-8");
} else {
    input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
}



input = input.split("\n");
let grid = [];

input.forEach(line => grid.push(line.split("")));

let pos;
let obstacles = [];
let direction = "N";

grid.forEach((row, rowIndex) => {
   row.forEach((col, colIndex) => {
    if (col == "#") obstacles.push([rowIndex, colIndex]);
    if (col == "^") pos = [rowIndex, colIndex];
   }) 
});

console.log(obstacles);

console.log(pos);