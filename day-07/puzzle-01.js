const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("\n");

const operators = ["*", "+"];

function isValid(row) {
  const [ans, nums] = row.split(": ");
  const numsArr = nums.split(" ").map(Number);

  const num1 = numsArr.shift();
  return calc(num1, numsArr, Number(ans), [], num1);
}

function calc(curValue, input, answer, collectedOps) {
  for (const op of operators) {
    const num = input[0];
    let tempValue = curValue;

    collectedOps.push(op);
    if (op === "*") {
      tempValue *= num;
    } else if (op === "+") {
      tempValue += num;
    }

    if (tempValue > answer) {
      continue;
    }

    if (input.length === 1) {
      if (tempValue === answer) {
        return true;
      }

      continue;
    }

    const result = calc(tempValue, input.slice(1), answer, collectedOps);
    if (result === true) {
      return true;
    } else if (result === false) {
      return false;
    }
  }
}

let answer = 0;
for (const row of input) {
  if (isValid(row)) {
    const [ans] = row.split(":");
    answer += Number(ans);
  }
}

console.log(answer);
