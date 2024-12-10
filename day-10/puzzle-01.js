const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("\n");

const dir = [
  [0, -1], // U
  [0, 1], // D
  [-1, 0], // L
  [1, 0], // R
];

function generateMap(inputList) {
  return inputList.map((row) => [...row]);
}

function trialheads(map) {
  const heads = [];
  map.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      if (col === "0") {
        heads.push([colI, rowI]);
      }
    });
  });
  return heads;
}

function calc(map, heads) {
  let total = 0;
  for (const head of heads) {
    const possibleEndPoints = [];
    explore(map, head, possibleEndPoints);

    const set = new Set(possibleEndPoints);
    total += set.size;
  }
  return total;
}

function explore(map, curPos, possibleEndPoint, height = 0) {
  const [curX, curY] = curPos;

  if (height === 9) {
    return curPos.join(",");
  }

  dir.forEach((dir) => {
    const [dirX, dirY] = dir;
    const nextX = curX + dirX;
    const nextY = curY + dirY;

    if (
      nextX < 0 ||
      nextX >= map[0].length ||
      nextY < 0 ||
      nextY >= map.length
    ) {
      return false;
    }

    if (map[nextY][nextX] === (height + 1).toString()) {
      const result = explore(map, [nextX, nextY], possibleEndPoint, height + 1);
      if (result) {
        possibleEndPoint.push(result);
      }
    }
  });
}

const map = generateMap(input);
const heads = trialheads(map);
const answer = calc(map, heads);

console.log(answer);
