// import filesystem
const fs = require("node:fs");

// test with example input 
const debug = false;
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


const guard = {
    pos: [0, 0],

    get posX() {
        return this.pos[1];
    },

    get posY() {
        return this.pos[0]
    },


    get inBounds() {
        if (this.pos[0] == -1 || this.pos[1] == -1) {
            return false;
        } else if (this.pos[0] > colLen || this.pos[1] > rowLen) {
            return false;
        } else {
            return true;
        }
    },

    direction: "^",

    charAt: ([y, x]) => grid[y][x],

    setCharAt: ([y, x], char) => grid[y][x] = char,

    turn: function() {
        if (this.direction == "^") this.direction = ">";
        else if (this.direction == ">") this.direction = "v";
        else if (this.direction == "v") this.direction = "<";
        else if (this.direction == "<") this.direction = "^";
        
    },


    move: function() {
        try {
            this.setCharAt(this.pos, "*");

            if (this.direction == "^") {
                if (this.charAt([this.posY-1, this.posX]) != "#") {
                    this.pos = [this.posY-1, this.posX];
                    this.setCharAt(this.pos, "^");
                } else {
                    this.turn();
                }
            }


            if (this.direction == ">") {
                if (this.charAt([this.posY, this.posX+1]) != "#") {
                    this.pos = [this.posY, this.posX+1];
                    this.setCharAt(this.pos, ">");
                } else {
                    this.turn();
                }
            }

            if (this.direction == "v") {
                if (this.charAt([this.posY+1, this.posX]) != "#") {
                    this.pos = [this.posY+1, this.posX];
                    this.setCharAt(this.pos, "v");
                } else {
                    this.turn();
                }
            }

            if (this.direction == "<") {
                if (this.charAt([this.posY, this.posX-1]) != "#") {
                    this.pos = [this.posY, this.posX-1];
                    this.setCharAt(this.pos, "<");
                } else {
                    this.turn();
                }
            }
        } catch (error) {
            this.pos = [-1, -1];
        }
    }
};





input = input.split("\n");
let grid = [];

input.forEach(line => grid.push(line.split("")));

let obstacles = [];

grid.forEach((row, rowIndex) => {
   row.forEach((col, colIndex) => {
    if (col == "#") obstacles.push([rowIndex, colIndex]);
    if (col == "^") guard.pos = [rowIndex, colIndex];
   }) 
});

const colLen = grid.length;
const rowLen = grid[1].length;


while (guard.inBounds) {
    guard.move();
}

let finalNumber = 0;

grid.forEach(element => {
    element.forEach(letter => {
        if (letter == "*") finalNumber++;
    });
});

console.log(finalNumber);