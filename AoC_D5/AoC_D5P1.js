// import filesystem
const fs = require("node:fs");

// test with example input 
const debug = false;
let input;

// Get the input; if in debug mode use example input, else use the actual input
if (!debug) {
    input = fs.readFileSync("input.txt", "utf-8");
} else {
    input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
}

// Split the input up into usable form
input = input.split("\n\n");
rules = input[0].split("\n");

splitRules = [];

rules.forEach(element => {
    splitRules.push(element.split("|"));
});

pages = input[1].split("\n");


// Initialize some counter variables
let passedPages = []
let finalNumber = 0;

// Go through each page
pages.forEach(page => {
    let failed = false;
    // in each page go through each rule
    splitRules.forEach((rule) => {
        // get the indexes that the rules are in
        let pos1 = page.indexOf(rule[0]);
        let pos2 = page.indexOf(rule[1]);

        // if the rule applies to this page
        if (pos1 > -1 && pos2 > -1) {
            // if the rule fails then update accordingly
            pos1 > pos2 && (failed = true);
        }
    });
    // if it passed all tests add the page to the list
    failed == false && passedPages.push(page);
});

// goes through each page and adds the middle number to the final count
passedPages.forEach((passedPage) => {
    passedPage = passedPage.split(",");
    let index = passedPage.length / 2 - .5;
    finalNumber += +passedPage[index];
});

console.log(finalNumber);