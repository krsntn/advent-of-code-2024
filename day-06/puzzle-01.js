const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("\n");

function getObsAndPos(input) {
  const obstructions = [];
  let startPos;
  for (let row = 0; row < input.length; row++) {
    for (let x = 0; x < input[row].length; x++) {
      if (input[row][x] === "#") {
        obstructions.push([row, x]);
      } else if (input[row][x] === "^") {
        startPos = [row, x];
      }
    }
  }
  return { startPos, obstructions };
}

function move(dirIndex, pos, obs, visitedMap, maxRow, maxCol) {
  const dirArr = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const dir = dirArr[dirIndex];
  const newDir = (dirIndex + 1) % 4;

  const newPos = [pos[0] + dir[0], pos[1] + dir[1]];

  if (
    newPos[0] < 0 ||
    newPos[0] >= maxRow ||
    newPos[1] < 0 ||
    newPos[1] >= maxCol
  ) {
    return { isEnd: true };
  }

  if (obs.some((x) => x.join(",") === newPos.join(","))) {
    return { newDir };
  }

  if (visitedMap.has([...newPos, dirIndex].join(","))) {
    return { isLoop: true };
  }

  visitedMap.add([...newPos, dirIndex].join(","));

  return { newPos };
}

const { startPos, obstructions } = getObsAndPos(input);
const visitedMap = new Set();

let curDir = 0;
let sPos = startPos;
let isRunning = true;

while (isRunning) {
  const { isEnd, newPos, newDir } = move(
    curDir,
    sPos,
    obstructions,
    visitedMap,
    input.length,
    input[0].length,
  );

  if (isEnd) {
    isRunning = false;
  }

  if (newPos) {
    sPos = newPos;
  }

  if (newDir !== undefined) {
    curDir = newDir;
  }
}

const visited = new Set(
  Array.from(visitedMap).map((x) => x.substring(0, x.lastIndexOf(","))),
);

console.log(visited.size + 1); // 1 is the starting point
