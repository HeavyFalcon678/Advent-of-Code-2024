// import filesystem
const fs = require("node:fs");

// test with example input 
const debug = false;
let input;

// Get the input; if in debug mode use example input, else use the actual input
if (!debug) {
    input = fs.readFileSync("input.txt", "utf-8");
} else {
    input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;    
}

// Split the input into lines
input = input.split(/\n/);


// Go through each line
const finalNumber = input.reduce((total, val) => {
    // Split the current line into an array
    const numbers = val.split(/\s/);

    let failed = false;
    let dampened = false;
    let increasing = null;

    // Go through each number
    for (let i = 0; i < numbers.length - 1; i++) {
        // The current and next numbers for testing
        // Check each set; if they're all good then it passes
        let firstNum = +numbers[i];
        let secondNum = +numbers[i+1];
        
        // first time, set if it's increasing or decreasing
        if (increasing == null) increasing = firstNum < secondNum ? true : false;

        // Check if it's still increasing or decreasing
        if ((increasing && (firstNum >= secondNum)) || (increasing == false && (firstNum <= secondNum))) {
            // if not then it fails
            dampened == false ? dampened = true : failed = true;
        }

        // Check if they differ by 4 or more, if not then it fails
        Math.abs(firstNum - secondNum) > 3 && (dampened == false ? dampened = true : failed = true);
    }

    // Add to total if it passes
    return total + (failed == false ? 1 : 0);
}, 0);

console.log(finalNumber);