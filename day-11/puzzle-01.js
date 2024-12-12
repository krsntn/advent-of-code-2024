const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split(" ");

function calc(inputDigit) {
  if (inputDigit === "0") {
    return ["1"];
  }

  if (inputDigit.length % 2 === 0) {
    return [
      inputDigit.slice(0, inputDigit.length / 2),
      (Number(inputDigit.slice(inputDigit.length / 2)) * 1).toString(),
    ];
  }

  return [(Number(inputDigit) * 2024).toString()];
}

function blink(inputList) {
  for (let i = 0; i < inputList.length; i++) {
    const result = calc(inputList[i]);

    if (result.length === 2) {
      inputList.splice(i, 1, ...result);
      i++;
    } else {
      inputList[i] = result[0];
    }
  }
}

for (let i = 0; i < 25; i++) {
  blink(input);
}
console.log(input.length);
