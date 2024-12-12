const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split(" ");

const cache = new Map();

function calc(inputDigit) {
  if (inputDigit === 0) {
    return [1];
  }

  const str = inputDigit.toString();
  if (str.length % 2 === 0) {
    return [
      Number(str.slice(0, str.length / 2)),
      Number(str.slice(str.length / 2)),
    ];
  }

  return [inputDigit * 2024];
}

function blink(num, times) {
  const key = `${num},${times}`;
  if (cache.has(key)) {
    return cache.get(key);
  }

  const result = calc(num);

  if (times === 1) {
    return result.length;
  }

  let sum = 0;
  result.forEach((x) => (sum += blink(x, times - 1)));

  cache.set(key, sum);
  return sum;
}

const answer = input.reduce((a, b) => a + blink(Number(b), 75), 0);

console.log(answer);
