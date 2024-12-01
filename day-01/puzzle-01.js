const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let leftList = [];
let rightList = [];

inputList.map((row) => {
  const rowArr = row.split(/\s+/);
  leftList.push(Number(rowArr[0]));
  rightList.push(Number(rowArr[1]));
});

leftList = leftList.sort((a, b) => a - b);
rightList = rightList.sort((a, b) => a - b);

const diffList = [];
for (let i = 0; i < leftList.length; i++) {
  diffList.push(Math.abs(leftList[i] - rightList[i]));
}

const answer = diffList.reduce((acc, row) => acc + row, 0);

// output answer
console.log(answer);
