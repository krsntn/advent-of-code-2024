const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("");

function generateBlocks(inputList) {
  let output = "";
  for (let i = 0, id = 0; i < inputList.length; i++) {
    const num = Number(inputList[i]);

    if (i % 2 === 0) {
      output += `${id},`.toString().repeat(num);
      id++;
    } else {
      output += ".,".repeat(num);
    }
  }
  return output.slice(0, -1);
}

function moveBlock(blockStr) {
  let str = blockStr;
  let toContinue = true;

  while (toContinue) {
    const blocks = str.split(",");
    const firstDotIndex = blocks.indexOf(".");
    const index = blocks.reverse().findIndex((val) => /\d+/.test(val));
    blocks.reverse();
    const lastDigitIndex = blocks.length - 1 - index;

    if (firstDotIndex === -1) {
      toContinue = false;
    } else {
      blocks[firstDotIndex] = blocks[lastDigitIndex];
      blocks[lastDigitIndex] = ".";
      const lastDigitI = blocks.reverse().findIndex((val) => /\d+/.test(val));
      str = blocks
        .reverse()
        .slice(0, blocks.length - lastDigitI)
        .join(",");
    }
  }

  return str;
}

function calc(blockStr) {
  const blocks = blockStr.split(",");

  let total = 0;
  for (let i = 0; i < blocks.length; i++) {
    const num = Number(blocks[i]);
    total += i * num;
  }

  return total;
}

const blockStr = generateBlocks(input);
const movedBlockStr = moveBlock(blockStr);
const answer = calc(movedBlockStr);

console.log(answer);
