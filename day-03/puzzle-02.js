const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim();

const reg = /mul\((\d+),(\d+)\)|do(?:n't)?\(\)/g;
const matches = [...input.matchAll(reg)];

let enableCalc = true;
let answer = 0;

for (const [match, num1, num2] of matches) {
  if (match === "do()") {
    enableCalc = true;
  } else if (match === "don't()") {
    enableCalc = false;
  } else if (enableCalc) {
    answer += Number(num1) * Number(num2);
  }
}

// output answer
console.log(answer);
