let content = "";
let floor = "";

// Building A Floor 1
console.log("% Building A Floor 1");
content += "% Building A Floor 1\n";
floor = "a1";

let array1 = [
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
    }

    return prologFacts;
}

// Convert the array to Prolog facts
let prologFacts1 = arrayToProlog(array1);
content += prologFacts1 + "\n";
// content += prologFacts + "\n";

// Building A Floor 2
console.log("% Building A Floor 2");
content += "% Building A Floor 2\n";
floor = "a2";

let array2 = [
    [3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 3, 0, 2, 2, 2, 2, 2, 0, 0, 0, 1],
    [1, 0, 0, 3, 2, 2, 2, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 2, 2, 2, 2, 0, 2, 3, 0, 2, 2, 3, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1],
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
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
    }

    return prologFacts;
}

// Convert the array to Prolog facts
let prologFacts2 = arrayToProlog(array2);
content += prologFacts2 + "\n";
// content += prologFacts + "\n";

// Building B Floor 1
console.log("% Building B Floor 1");
content += "% Building B Floor 1\n";
floor = "b1";

let array3 = [
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
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
    }

    return prologFacts;
}

// Convert the array to Prolog facts
let prologFacts3 = arrayToProlog(array3);
content += prologFacts3 + "\n";
floor = "b2";
// content += prologFacts + "\n";


// Building B Floor2
console.log("% Building B Floor 2");
content += "% Building B Floor 2\n";
let array4 = [
    [3, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [2, 2, 1, 0, 0, 1, 0, 0, 0, 3, 2, 2, 0, 0, 0, 0, 1, 0, 0, 3, 0, 2, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

// Convert the new array to Prolog facts
let prologFacts4 = arrayToProlog(array4);
content += prologFacts4 + "\n\n";


// Building B Floor 3
console.log("% Building B Floor 3");
content += "% Building B Floor 3\n";
floor = "b3";

let array5 = [
    [3, 2, 2, 1, 0, 3, 2, 2, 1, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 1, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 2, 0, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
    let prologFacts = '';

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const value = array[row][col];
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

// Convert the new array to Prolog facts
let prologFacts5 = arrayToProlog(array5);
content += prologFacts5 + "\n";


// Building C Floor 1
console.log("% Building C Floor 1");
content +=  "% Building C Floor 1\n";
floor = "c1";

let array66 = [
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
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

let prologFacts66 = arrayToProlog(array66);
content += prologFacts66 + "\n";

// Building C Floor 2
console.log("% Building C Floor 2");
content +=  "% Building C Floor 2\n";
floor = "c2";

let array6 = [
    [3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [3, 2, 2, 2, 1, 0, 2, 0, 2, 2, 2, 2, 1],
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
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
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
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

let prologFacts6 = arrayToProlog(array6);
content += prologFacts6 + "\n";


// Building C Floor 3
console.log("% Building C Floor 3");
content +=  "% Building C Floor 3\n";
floor = "c3";

let array7 = [
    [3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 3, 0, 2, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
        prologFacts += '\n';
    }

    return prologFacts;
}

let prologFacts7 = arrayToProlog(array7);
content += prologFacts7 + "\n";

// Building C Floor 4
console.log("% Building C Floor 4");
content +=  "% Building C Floor 4\n";
floor = "c4";

let array8 = [
    [3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
    }

    return prologFacts;
}

let prologFacts8 = arrayToProlog(array8);
content += prologFacts8 + "\n";


// Building D Floor 1
console.log("% Building D Floor 1");
content +=  "% Building D Floor 1\n";
floor = "d1";

let array9 = [
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 2, 2, 0, 2, 1],
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
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
    }

    return prologFacts;
}

let prologFacts9 = arrayToProlog(array9);
content += prologFacts9 + "\n";

// Building D Floor 2
console.log("% Building D Floor 2");
content +=  "% Building D Floor 2\n";
floor = "d2";

let array10 = [
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
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
    }

    return prologFacts;
}

let prologFacts10 = arrayToProlog(array10);
content += prologFacts10 + "\n";


// Building D Floor 3
console.log("% Building D Floor 3");
content +=  "% Building D Floor 3\n";
floor = "d3";


let array11 = [
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
            prologFacts += `m(${floor},${row},${col},${value}).\n`;
        }
    }

    return prologFacts;
}

let prologFacts11 = arrayToProlog(array11);
content += prologFacts11 + "\n";


const fs = require('fs');

// String to be written to the file
const textToWrite = content;

// File path where you want to write the text
const filePath = 'floorMapsBC.pl';

// Write the string to the file
fs.writeFile(filePath, textToWrite, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('Text has been written to', filePath);
});