const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("\n");

const inputList = input.map((row) => row.split(""));

const direction = [
  { dr: 0, dc: 1 },
  { dr: 1, dc: 0 },
  { dr: 0, dc: -1 },
  { dr: -1, dc: 0 },
  { dr: -1, dc: 1 },
  { dr: 1, dc: 1 },
  { dr: 1, dc: -1 },
  { dr: -1, dc: -1 },
];

function isWithinBounds(row, col) {
  return (
    row >= 0 &&
    row < inputList.length &&
    col >= 0 &&
    col < inputList[row].length
  );
}

function check(row, col, direction) {
  const { dr, dc } = direction;

  let value = "";
  for (let i = 1; i <= 3; i++) {
    const newRow = row + dr * i;
    const newCol = col + dc * i;

    if (!isWithinBounds(newRow, newCol)) {
      return false;
    }

    value += inputList[newRow][newCol];
  }

  return value === "MAS";
}

let answer = 0;

for (let row = 0; row < inputList.length; row++) {
  for (let col = 0; col < inputList[row].length; col++) {
    if (inputList[row][col] === "X") {
      for (const d of direction) {
        if (check(row, col, d)) {
          answer++;
        }
      }
    }
  }
}

// output answer
console.log(answer);
