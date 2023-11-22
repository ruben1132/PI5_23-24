let content = "";
let floor = "";

// Building A Floor 1
console.log("% Building A Floor 1");
content += "% Building A Floor 1\n";
floor = "a1";

let array = [
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
  }

  return prologFacts;
}

// Convert the array to Prolog facts
let prologFacts = arrayToProlog(array);
content += prologFacts + "\n";
// content += prologFacts + "\n";

// Building A Floor 2
console.log("% Building A Floor 2");
content += "% Building A Floor 2\n";
floor = "a2";

array = [
    [3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 3, 0, 2, 2, 2, 2, 2, 0, 0, 0, 1],
    [1, 0, 0, 3, 2, 0, 2, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 2, 2, 2, 2, 0, 2, 3, 0, 2, 2, 3, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
  }

  return prologFacts;
}

// Convert the array to Prolog facts
prologFacts = arrayToProlog(array);
content += prologFacts + "\n";
// content += prologFacts + "\n";

// Building B Floor1
console.log("% Building B Floor 1");
content += "% Building B Floor 1\n";
floor = "b1";
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
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
    prologFacts += "\n";
  }

  return prologFacts;
}

// Convert the new array to Prolog facts
prologFacts = arrayToProlog(newArray);
content += prologFacts + "\n\n";

// Building B Floor2
console.log("% Building B Floor 2");
content += "% Building B Floor 2\n";
floor = "b2";
newArray = [
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
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
    prologFacts += "\n";
  }

  return prologFacts;
}

// Convert the new array to Prolog facts
prologFacts = arrayToProlog(newArray);
content += prologFacts + "\n\n";

// Building B Floor 3
console.log("% Building B Floor 3");
content += "% Building B Floor 3\n";
floor = "b3";

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
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
];

function arrayToProlog(array) {
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
    prologFacts += "\n";
  }

  return prologFacts;
}

// Convert the new array to Prolog facts
prologFacts = arrayToProlog(newArray);
content += prologFacts + "\n";

// Building C Floor 1
console.log("% Building C Floor 1");
content += "% Building C Floor 1\n";
floor = "c1";

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
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
    prologFacts += "\n";
  }

  return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";

// Building C Floor 2
console.log("% Building C Floor 2");
content += "% Building C Floor 2\n";
floor = "c2";

array = [
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
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
    prologFacts += "\n";
  }

  return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";

// Building C Floor 3
console.log("% Building C Floor 3");
content += "% Building C Floor 3\n";
floor = "c3";

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
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
    prologFacts += "\n";
  }

  return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";

// Building C Floor 4
console.log("% Building C Floor 4");
content += "% Building C Floor 4\n";
floor = "c4";

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
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
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
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
  }

  return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";

// Building D Floor 1
console.log("% Building D Floor 1");
content += "% Building D Floor 1\n";
floor = "d1";

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
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
  }

  return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";

// Building D Floor 2
console.log("% Building D Floor 2");
content += "% Building D Floor 2\n";
floor = "d2";

array = [
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
  }

  return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";

// Building D Floor 3
console.log("% Building D Floor 3");
content += "% Building D Floor 3\n";
floor = "d3";

array = [
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
  let prologFacts = "";

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      prologFacts += `m(${floor},${col + 1},${row + 1},${value}).\n`;
    }
  }

  return prologFacts;
}

prologFacts = arrayToProlog(array);
content += prologFacts + "\n";

const fs = require("fs");

// String to be written to the file
const textToWrite = content;

// File path where you want to write the text
const filePath = "floorMapsBC.pl";

// Write the string to the file
fs.writeFile(filePath, textToWrite, (err) => {
  if (err) {
    console.error("Error writing to file:", err);
    return;
  }
  console.log("Text has been written to", filePath);
});
