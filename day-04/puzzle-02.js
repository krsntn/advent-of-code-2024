const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("\n");

const inputList = input.map((row) => row.split(""));

const direction = {
  rightUp: { dr: -1, dc: 1 },
  rightDown: { dr: 1, dc: 1 },
  leftDown: { dr: 1, dc: -1 },
  leftUp: { dr: -1, dc: -1 },
};

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

  const newRow = row + dr;
  const newCol = col + dc;
  if (
    isWithinBounds(newRow, newCol) &&
    ["M", "S"].includes(inputList[newRow][newCol])
  ) {
    return inputList[newRow][newCol];
  }

  return false;
}

let answer = 0;

for (let row = 0; row < inputList.length; row++) {
  for (let col = 0; col < inputList[row].length; col++) {
    const curVal = inputList[row][col];

    if (curVal === "A") {
      const rightUp = check(row, col, direction.rightUp);
      const leftDown = check(row, col, direction.leftDown);
      const rightDown = check(row, col, direction.rightDown);
      const leftUp = check(row, col, direction.leftUp);

      if (
        rightUp &&
        leftDown &&
        rightDown &&
        leftUp &&
        rightUp !== leftDown &&
        leftUp !== rightDown
      ) {
        answer++;
      }
    }
  }
}

// output answer
console.log(answer);
