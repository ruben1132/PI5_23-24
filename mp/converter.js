let content ="";

// Building A Floor 2
console.log("% Building A Floor 2");
content += "% Building A Floor 2\n";

let array = [
    [3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 3, 0, 2, 2, 2, 2, 2, 0, 0, 0, 1],
    [1, 0, 0, 3, 2, 0, 2, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 2, 2, 2, 2, 0, 2, 3, 0, 2, 2, 3, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${col + 1},${row + 1},${value}).\n`;
        }
    }

    return prologFacts;
}

// Convert the array to Prolog facts
let prologFacts = arrayToProlog(array);
content += prologFacts + "\n";
// content += prologFacts + "\n";


// Building B Floor2
console.log("% Building B Floor 2");
content += "% Building B Floor 2\n";
newArray = [
    [3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [3, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [3, 2, 0, 2, 1, 0, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 0, 2, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 2, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${col + 1},${row + 1},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

// Convert the new array to Prolog facts
prologFacts = arrayToProlog(newArray);
content += prologFacts + "\n\n";


// Building B Floor 3
console.log("% Building B Floor 3");
content += "% Building B Floor 3\n";

newArray = [
    [3, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [2, 2, 1, 0, 0, 1, 0, 0, 0, 3, 2, 2, 0, 0, 0, 0, 1, 0, 0, 3, 0, 2, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${col + 1},${row + 1},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

// Convert the new array to Prolog facts
prologFacts = arrayToProlog(newArray);
content += prologFacts + "\n";

// Building B Floor 4 
console.log("% Building B Floor 4");
content +=  "% Building B Floor 4\n";

newArray = [
    [3, 2, 2, 1, 0, 3, 2, 2, 1, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 1, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 2, 0, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${col + 1},${row + 1},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

// Convert the new array to Prolog facts
prologFacts = arrayToProlog(newArray);
content += prologFacts + "\n";


// Building C Floor 2
console.log("% Building C Floor 1");
content +=  "% Building C Floor 1\n";

array = [
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 1],
    [3, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 1],
    [3, 2, 2, 2, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 3, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [3, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 3, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${col + 1},${row + 1},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";


// Building C Floor 2
console.log("% Building C Floor 2");
content +=  "% Building C Floor 2\n";

array = [
    [3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [3, 2, 2, 2, 3, 0, 2, 0, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 3, 2, 2, 2, 2, 2, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [3, 2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 3, 2, 2, 2, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [3, 2, 2, 2, 0, 0, 0, 0, 3, 0, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 3, 2, 2, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 2, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${col + 1},${row + 1},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";


// Building C Floor 3
console.log("% Building C Floor 3");
content +=  "% Building C Floor 3\n";

array = [
    [3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 3, 0, 2, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [3, 2, 2, 0, 3, 0, 2, 2, 3, 0, 2, 2, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${col + 1},${row + 1},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";

// Building C Floor 4
console.log("% Building C Floor 4");
content +=  "% Building C Floor 4\n";

array = [
    [3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [3, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${row + 1},${col + 1},${value}).\n`;
        }
    }

    return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";

// Building D Floor 1
console.log("% Building D Floor 1");
content +=  "% Building D Floor 1\n";

array = [
    [3, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [3, 2, 2, 2, 2, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [3, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [3, 2, 2, 2, 2, 1, 0, 0, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${row + 1},${col + 1},${value}).\n`;
        }
    }

    return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";


// Building D Floor 2
console.log("% Building D Floor 2");
content +=  "% Building D Floor 2\n";

array = [
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 2, 2, 2, 1, 0, 3, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [3, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [3, 2, 2, 2, 1, 0, 2, 3, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 3, 0, 2, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${row + 1},${col + 1},${value}).\n`;
        }
    }

    return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";


// Building D Floor 3
console.log("% Building D Floor 3");
content +=  "% Building D Floor 3\n";


array = [
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [3, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${row + 1},${col + 1},${value}).\n`;
        }
    }

    return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";




const fs = require('fs');

// String to be written to the file
const textToWrite = content;

// File path where you want to write the text
const filePath = 'floorMapsBaseConhecimento.pl';

// Write the string to the file
fs.writeFile(filePath, textToWrite, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('Text has been written to', filePath);
});