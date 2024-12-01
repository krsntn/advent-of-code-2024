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

const calcList = [];
for (let i = 0; i < leftList.length; i++) {
  const left = leftList[i];
  const rightCount = rightList.filter((val) => val === left).length;
  calcList.push(left * rightCount);
}

const answer = calcList.reduce((acc, row) => acc + row, 0);

// output answer
console.log(answer);
