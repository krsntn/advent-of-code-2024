const fs = require("fs");
const filename = "./input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

let safeCount = 0;
inputList.map((row) => {
  const rowArr = row.split(/\s+/).map(Number);

  let isIncreasing = false;
  for (let i = 1; i < rowArr.length; i++) {
    const prev = rowArr[i - 1];
    const cur = rowArr[i];

    if (cur === prev) {
      break;
    }

    if (i === 1) {
      isIncreasing = cur > prev;
    }

    if (isIncreasing) {
      if (cur < prev) break;
      if (cur - prev > 3) break;
    }

    if (!isIncreasing) {
      if (cur > prev) break;
      if (prev - cur > 3) break;
    }

    if (i === rowArr.length - 1) {
      safeCount++;
    }
  }
});

// output answer
console.log(safeCount);
