const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim();

const reg = /mul\((\d+),(\d+)\)/g;
const matches = [...input.matchAll(reg)];

const answer = matches.reduce(
  (acc, [_, a, b]) => acc + Number(a) * Number(b),
  0,
);

// output answer
console.log(answer);
