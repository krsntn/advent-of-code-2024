const filename = "./input.txt";
const fs = require("fs");
const input = fs.readFileSync(filename, "utf8").trim().split("\n\n");

const dir = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

function generateMapArr(input) {
  const arr = input.split("\n");
  return arr.map((x) => x.split(""));
}

function generateNodes(map, match) {
  const output = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === match) {
        output.push([x, y]);
      }
    }
  }

  return output;
}

function getNewBoxPos(pos, direction, allBoxes) {
  const nxPos = [pos[0] + direction[0], pos[1] + direction[1]];
  const nxBox = allBoxes.find(([x, y]) => x === nxPos[0] && y === nxPos[1]);

  if (nxBox) {
    return getNewBoxPos(nxBox, direction, allBoxes);
  } else {
    return nxPos;
  }
}

function isHitWalls(pos, walls) {
  return walls.find((x) => x[0] === pos[0] && x[1] === pos[1]);
}

function move(robotPos, walls, boxes, ins) {
  let direction;
  switch (ins) {
    case "<":
      direction = dir.L;
      break;
    case ">":
      direction = dir.R;
      break;
    case "^":
      direction = dir.U;
      break;
    case "v":
      direction = dir.D;
      break;
  }

  let newRobotPos = [robotPos[0] + direction[0], robotPos[1] + direction[1]];
  if (isHitWalls(newRobotPos, walls)) {
    return;
  }

  let newBoxes = boxes;
  if (boxes.some((x) => x[0] === newRobotPos[0] && x[1] === newRobotPos[1])) {
    const newBoxPos = getNewBoxPos(robotPos, direction, boxes);
    if (isHitWalls(newBoxPos, walls)) {
      return;
    }

    newBoxes = boxes.filter(
      (x) => x[0] !== newRobotPos[0] || x[1] !== newRobotPos[1],
    );
    newBoxes.push(newBoxPos);
  }

  return { newRobotPos, newBoxes };
}

const map = generateMapArr(input[0]);
const walls = generateNodes(map, "#");
let boxes = generateNodes(map, "O");
let robotPos = generateNodes(map, "@")[0];
const insList = input[1].replace(/\n/g, "").split("");

for (const ins of insList) {
  const newValue = move(robotPos, walls, boxes, ins);

  if (newValue?.newRobotPos) {
    robotPos = newValue.newRobotPos;
    boxes = newValue.newBoxes;
  }
}

const ans = boxes.reduce((acc, cur) => acc + (100 * cur[1] + cur[0]), 0);
console.log(ans);
