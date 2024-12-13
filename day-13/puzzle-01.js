const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("\n\n");

function calc({ A, B, P }) {
  const a = (P.y * B.x - P.x * B.y) / (A.y * B.x - A.x * B.y);
  const b = (P.x - a * A.x) / B.x;
  if (Math.floor(a) === a && Math.floor(b) === b) return a * 3 + b;
  else return 0;
}

function parse(input) {
  return input.map((group) => {
    const [a, b, prize] = group.split("\n");
    const [, ax, ay] = a.match(/X\+(\d+), Y\+(\d+)/);
    const [, bx, by] = b.match(/X\+(\d+), Y\+(\d+)/);
    const [, px, py] = prize.match(/X=(\d+), Y=(\d+)/);
    return {
      A: { x: Number(ax), y: Number(ay) },
      B: { x: Number(bx), y: Number(by) },
      P: { x: Number(px), y: Number(py) },
    };
  });
}

const machines = parse(input);
const answer = machines.map(calc).reduce((a, b) => a + b, 0);

console.log(answer);

function part2(input) {
  let machines = parse(input);
  machines = machines.map((m) => ({ ...m, px: m.px + 10000000000000 }));
  machines = machines.map((m) => ({ ...m, py: m.py + 10000000000000 }));
  return machines.map(solve).reduce((a, b) => a + b, 0);
}
