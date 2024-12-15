const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("\n");

function parse(input) {
  return input.map((line) => {
    const [p, v] = line.split(" ");
    const regex = /(-?\d+),(-?\d+)/g;
    const [, x, y] = [...p.matchAll(regex)][0];
    const [, vx, vy] = [...v.matchAll(regex)][0];
    return {
      x: Number(x),
      y: Number(y),
      vx: Number(vx),
      vy: Number(vy),
    };
  });
}

function move(obj, seconds, floorMap) {
  const totalVX = obj.vx * seconds;
  const totalVY = obj.vy * seconds;

  let newX = (obj.x + totalVX) % floorMap.totalX;
  let newY = (obj.y + totalVY) % floorMap.totalY;
  newX = newX < 0 ? newX + floorMap.totalX : Math.abs(newX);
  newY = newY < 0 ? newY + floorMap.totalY : Math.abs(newY);

  obj.x = newX;
  obj.y = newY;
}

const floorMap = {
  totalX: 101,
  totalY: 103,
};

const objs = parse(input);

let answer;
outerLoop: for (let i = 1; i < Infinity; i++) {
  for (const obj of objs) {
    move(obj, 1, floorMap);
  }

  for (let y = 0; y < floorMap.totalY; y++) {
    let line = Array(floorMap.totalX).fill(".");

    for (const obj of objs.filter((obj) => obj.y === y)) {
      const { x } = obj;
      line[x] = "#";
    }

    line = line.join("");
    if (line.includes("###############################")) {
      answer = i;
      break outerLoop;
    }
  }
}

console.log(answer);
