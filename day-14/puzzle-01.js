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

function calc(objs, floorMap) {
  const middleX = Math.floor(floorMap.totalX / 2);
  const middleY = Math.floor(floorMap.totalY / 2);

  const output = {
    tl: 0,
    tr: 0,
    bl: 0,
    br: 0,
  };

  for (const obj of objs) {
    if (obj.x < middleX && obj.y < middleY) {
      output.tl++;
    } else if (obj.x > middleX && obj.y < middleY) {
      output.tr++;
    } else if (obj.x < middleX && obj.y > middleY) {
      output.bl++;
    } else if (obj.x > middleX && obj.y > middleY) {
      output.br++;
    }
  }

  return output.tl * output.tr * output.bl * output.br;
}

const floorMap = {
  totalX: 101,
  totalY: 103,
};

const objs = parse(input);
for (const obj of objs) {
  move(obj, 100, floorMap);
}
const answer = calc(objs, floorMap);

console.log(answer);
