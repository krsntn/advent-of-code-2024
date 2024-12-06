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

function move(dir, pos, obs, visitedMap, maxRow, maxCol, part) {
  const dirArr = ["u", "r", "d", "l"];
  const newDir = dirArr[(dirArr.indexOf(dir) + 1) % 4];
  const [y, x] = pos;

  const directionConfig = {
    u: {
      filter: (mapY, mapX, x, y) => mapX === x && mapY < y,
      sort: (a, b) => b[0] - a[0],
    },
    r: {
      filter: (mapY, mapX, x, y) => mapY === y && mapX > x,
      sort: (a, b) => a[1] - b[1],
    },
    d: {
      filter: (mapY, mapX, x, y) => mapX === x && mapY > y,
      sort: (a, b) => a[0] - b[0],
    },
    l: {
      filter: (mapY, mapX, x, y) => mapY === y && mapX < x,
      sort: (a, b) => b[1] - a[1],
    },
  };

  const { filter, sort } = directionConfig[dir];
  const data = obs
    .filter(([mapY, mapX]) => filter(mapY, mapX, x, y))
    .sort(sort);
  const isEnd = data.length === 0;
  const block = isEnd
    ? dir === "u"
      ? [-1, pos[1]]
      : dir === "r"
        ? [pos[0], maxCol]
        : dir === "d"
          ? [maxRow, pos[1]]
          : [pos[0], -1]
    : data[0];

  const addVisited = (i, j, direction) => {
    const value = part === 2 ? [i, j, direction].join(",") : [i, j].join(",");
    if (part === 2 && visitedMap.has(value)) return true;
    visitedMap.add(value);
    return false;
  };

  let newPos;
  if (dir === "u") {
    newPos = [block[0] + 1, block[1]];
    for (let i = pos[0]; i > block[0]; i--) {
      if (addVisited(i, block[1], "u")) return { isLoop: true };
    }
  } else if (dir === "r") {
    newPos = [block[0], block[1] - 1];
    for (let i = pos[1]; i < block[1]; i++) {
      if (addVisited(block[0], i, "r")) return { isLoop: true };
    }
  } else if (dir === "d") {
    newPos = [block[0] - 1, block[1]];
    for (let i = pos[0]; i < block[0]; i++) {
      if (addVisited(i, block[1], "d")) return { isLoop: true };
    }
  } else if (dir === "l") {
    newPos = [block[0], block[1] + 1];
    for (let i = pos[1]; i > block[1]; i--) {
      if (addVisited(block[0], i, "l")) return { isLoop: true };
    }
  }

  return {
    isEnd,
    newPos,
    newDir,
  };
}

function calc(start, obstructionList, input, part) {
  const visitedMap = new Set();
  let curDir = "u";
  let sPos = start;
  let isRunning = true;

  while (isRunning) {
    const { isEnd, newPos, newDir, isLoop } = move(
      curDir,
      sPos,
      obstructionList,
      visitedMap,
      input.length,
      input[0].length,
      part,
    );

    if (isLoop) {
      return { isLoop };
    } else if (isEnd) {
      isRunning = false;
    } else {
      curDir = newDir;
      sPos = newPos;
    }
  }

  return visitedMap;
}

const { startPos, obstructions } = getObsAndPos(input);

const vM = calc(startPos, obstructions, input);
const possibleBlock = Array.from(vM);
possibleBlock.shift();

let blockCount = 0;

for (const blockPos of possibleBlock) {
  const [mapY, mapX] = blockPos.split(",").map((x) => Number(x));
  const newObs = [...obstructions, [mapY, mapX]];

  if (calc(startPos, newObs, input, 2)?.isLoop) {
    blockCount++;
  }
}

console.log(blockCount);
