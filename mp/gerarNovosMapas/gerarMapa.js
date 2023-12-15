function arrayToProlog(array, floor) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${building}${floor},${row},${col},${value}).\n`;
        }
    }

    return prologFacts;
}

console.log("% Building A Floor 1");
let floorPlan = [
    [3, 2, 2, 2, 2, 2, 2, 3],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 2, 2, 1],
    [1, 2, 2, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [3, 2, 2, 0, 2, 2, 2, 0],
];
let content = "";
let building = "a";
let floor = "1";

// Convert the array to Prolog facts
let prologFacts = arrayToProlog(floorPlan, floor);
content += `% Building ${building} Floor ${floor}\n`;
content += prologFacts + "\n";

console.log(content); // Output the generated Prolog facts






console.log("% Building B Floor 1");
floorPlan = [
    [3, 2, 2, 2, 2, 2, 2, 3],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 2, 2, 1],
    [1, 2, 2, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [3, 2, 2, 2, 2, 2, 2, 0],
];


building = "b";
floor = "1";

// Convert the array to Prolog facts
prologFacts = arrayToProlog(floorPlan, floor);
content += `% Building ${building} Floor ${floor}\n`;
content += prologFacts + "\n";

console.log(content); // Output the generated Prolog facts

console.log("% Building B Floor 2");
floorPlan = [
    [3, 2, 2, 0, 2, 2, 2, 3],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 2, 2, 1],
    [1, 2, 2, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 1],
    [3, 2, 2, 0, 2, 2, 2, 0],
];


building = "b";
floor = "1";

// Convert the array to Prolog facts
prologFacts = arrayToProlog(floorPlan, floor);
content += `% Building ${building} Floor ${floor}\n`;
content += prologFacts + "\n";

console.log(content); // Output the generated Prolog facts


console.log("% Building C Floor 1");
floorPlan = [
    [3, 2, 2, 2, 2, 2, 2, 3],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 2, 2, 1],
    [1, 2, 2, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [3, 2, 2, 2, 2, 2, 2, 0],
];


building = "c";
floor = "1";

// Convert the array to Prolog facts
prologFacts = arrayToProlog(floorPlan, floor);
content += `% Building ${building} Floor ${floor}\n`;
content += prologFacts + "\n";

console.log(content); // Output the generated Prolog facts

console.log("% Building C Floor 2");
floorPlan = [
    [3, 2, 2, 2, 2, 2, 2, 3],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 2, 2, 1],
    [1, 2, 2, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [3, 2, 2, 2, 2, 2, 2, 0],
];


building = "c";
floor = "2";

// Convert the array to Prolog facts
prologFacts = arrayToProlog(floorPlan, floor);
content += `% Building ${building} Floor ${floor}\n`;
content += prologFacts + "\n";

console.log(content); // Output the generated Prolog facts

console.log("% Building C Floor 3");
floorPlan = [
    [3, 2, 2, 0, 2, 2, 2, 3],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 2, 2, 1],
    [1, 2, 2, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 1],
    [3, 2, 2, 2, 2, 2, 2, 0],
];


building = "c";
floor = "3";

// Convert the array to Prolog facts
prologFacts = arrayToProlog(floorPlan, floor);
content += `% Building ${building} Floor ${floor}\n`;
content += prologFacts + "\n";

console.log(content); // Output the generated Prolog facts



console.log("% Building D Floor 1");
floorPlan = [
    [3, 2, 2, 2, 2, 2, 2, 3],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 2, 2, 1],
    [1, 2, 2, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [3, 2, 2, 2, 2, 2, 2, 0],
];


building = "d";
floor = "1";

// Convert the array to Prolog facts
prologFacts = arrayToProlog(floorPlan, floor);
content += `% Building ${building} Floor ${floor}\n`;
content += prologFacts + "\n";

console.log(content); // Output the generated Prolog facts

console.log("% Building D Floor 2");
floorPlan = [
    [3, 2, 2, 2, 2, 2, 2, 3],
    [1, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 2, 2, 1],
    [1, 2, 2, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [3, 2, 2, 0, 2, 2, 2, 0],
];


building = "d";
floor = "2";

// Convert the array to Prolog facts
prologFacts = arrayToProlog(floorPlan, floor);
content += `% Building ${building} Floor ${floor}\n`;
content += prologFacts + "\n";

console.log(content); // Output the generated Prolog facts





const fs = require('fs');

// String to be written to the file
const textToWrite = content;

// File path where you want to write the text
const filePath = 'newFloorMapsBC.pl';

// Write the string to the file
fs.writeFile(filePath, textToWrite, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('Text has been written to', filePath);
});