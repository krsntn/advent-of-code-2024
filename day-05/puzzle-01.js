const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("\n");

const emptyIndex = input.indexOf("");
const rules = input.slice(0, emptyIndex);
const updateList = input.slice(emptyIndex + 1);

function createMap(inputRules) {
  const inArr = inputRules.map((row) => row.split("|"));

  const map = new Map();
  for (const [key, value] of inArr) {
    const values = map.get(key) || [];
    values.push(value);
    map.set(key, values);
  }
  return map;
}

function check(inputStr, map) {
  const inputArr = inputStr.split(",");

  for (let i = 0; i < inputArr.length; i++) {
    const curVal = inputArr[i];
    for (let j = i + 1; j < inputArr.length; j++) {
      const nextVal = inputArr[j];

      if (!map.get(curVal)?.includes(nextVal)) {
        return false;
      }
    }
  }
  return inputStr;
}

const map = createMap(rules);
const result = updateList.filter((row) => check(row, map));

const answer = result.reduce((acc, cur) => {
  const row = cur.split(",");
  const midIndex = Math.floor(row.length / 2);
  return acc + Number(row[midIndex]);
}, 0);

// output answer
console.log(answer);
