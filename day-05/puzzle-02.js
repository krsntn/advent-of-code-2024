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

function checkInvalid(inputStr, map) {
  const inputArr = inputStr.split(",");

  for (let i = 0; i < inputArr.length; i++) {
    const curVal = inputArr[i];
    for (let j = i + 1; j < inputArr.length; j++) {
      const nextVal = inputArr[j];

      if (!map.get(curVal)?.includes(nextVal)) {
        return true;
      }
    }
  }
  return false;
}

function rearrange(val, inputArr, map, output) {
  if (inputArr.length === 0) {
    output.push(val);
    return output;
  }
  for (let i = 0; i < inputArr.length; i++) {
    if (map.get(val)?.includes(inputArr[i])) {
      output.push(val);
      const test = rearrange(
        inputArr[i],
        inputArr.filter((row) => row !== inputArr[i]),
        map,
        output,
      );
      if (test) {
        return test;
      }
      output.pop();
    }
  }
  return false;
}

const map = createMap(rules);
const invalidList = updateList.filter((row) => checkInvalid(row, map));
const result = [];

for (let x = 0; x < invalidList.length; x++) {
  const row = invalidList[x];

  for (let y = 0; y < row.split(",").length; y++) {
    const val = row.split(",")[y];

    const response = rearrange(
      val,
      row.split(",").filter((v) => val !== v),
      map,
      [],
    );
    if (response) {
      result.push(response);
      break;
    }
  }
}

const answer = result.reduce((acc, row) => {
  const midIndex = Math.floor(row.length / 2);
  return acc + Number(row[midIndex]);
}, 0);

// output answer
console.log(answer);
