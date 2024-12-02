const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let safeCount = 0;

function checkIsSafe(arr) {
  const isIncreasing = arr[1] > arr[0];

  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];

    if (
      diff === 0 ||
      Math.abs(diff) > 3 ||
      (isIncreasing && diff < 0) ||
      (!isIncreasing && diff > 0)
    ) {
      return false;
    }
  }

  return true;
}

inputList.forEach((row) => {
  const rowArr = row.split(/\s+/).map(Number);

  if (checkIsSafe(rowArr)) {
    safeCount++;
    return;
  }

  for (let i = 0; i < rowArr.length; i++) {
    const newArr = [...rowArr.slice(0, i), ...rowArr.slice(i + 1)];
    if (checkIsSafe(newArr)) {
      safeCount++;
      break;
    }
  }
});

// output answer
console.log(safeCount);
