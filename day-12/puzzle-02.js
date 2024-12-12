const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("\n");

const dirs = [
  [0, -1], // U
  [1, 0], // R
  [0, 1], // D
  [-1, 0], // L
];

function exploreRange(cur, visitedMap, vLetterMap, map) {
  const [curX, curY, letter] = cur;

  for (const dir of dirs) {
    const [dx, dy] = dir;
    const newX = curX + dx;
    const newY = curY + dy;

    if (newX < 0 || newY < 0 || newX >= map[0].length || newY >= map.length) {
      continue;
    }

    if (!vLetterMap.has(`${newX},${newY}`) && map[newY][newX] === letter) {
      visitedMap.add(`${newX},${newY}`);
      vLetterMap.add(`${newX},${newY}`);
      exploreRange([newX, newY, letter], visitedMap, vLetterMap, map);
    }
  }
}

function countSides(set) {
  let arr = Array.from(set).map((x) => x.split(",").map(Number));

  const wallMap = new Map();
  for (const [x, y] of arr) {
    for (const dir of dirs) {
      const [dx, dy] = dir;
      const newX = x + dx;
      const newY = y + dy;
      if (!arr.some(([x, y]) => x === newX && y === newY)) {
        let key;
        if (x === newX) {
          key = `h,${y},${(newY - y) / 2}`;
          wallMap.set(key, (wallMap.get(key) || new Set()).add(x));
        } else if (y === newY) {
          key = `v,${x},${(newX - x) / 2}`;
          wallMap.set(key, (wallMap.get(key) || new Set()).add(y));
        }
      }
    }
  }

  let sides = 0;
  for (const [_, set] of wallMap) {
    const arr = Array.from(set);
    arr.sort((a, b) => a - b);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] + 1 !== arr[i + 1]) {
        sides++;
      }
    }
  }

  return (wallMap.size + sides) * set.size;
}

function calc(arr) {
  let count = 0;
  const visitedMap = new Set();
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      const cur = [x, y, arr[y][x]];

      if (visitedMap.has(`${x},${y}`)) {
        continue;
      }

      const vLetterSet = new Set();
      visitedMap.add(`${x},${y}`);
      vLetterSet.add(`${x},${y}`);

      exploreRange(cur, visitedMap, vLetterSet, arr);
      count += countSides(vLetterSet);
    }
  }
  return count;
}

const answer = calc(input);
console.log(answer);
