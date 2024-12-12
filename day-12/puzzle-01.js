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

      const perimeters = countPerimeter(vLetterSet);
      count += perimeters * vLetterSet.size;
    }
  }
  return count;
}

function countPerimeter(set) {
  const values = Array.from(set);
  let count = 0;

  for (const str of values) {
    for (const dir of dirs) {
      const [x, y] = str.split(",").map(Number);
      const [dx, dy] = dir;

      if (!values.includes(`${x + dx},${y + dy}`)) {
        count++;
      }
    }
  }
  return count;
}

const answer = calc(input);
console.log(answer);
