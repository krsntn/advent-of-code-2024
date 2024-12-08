const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("\n");

function getAntennasList(inputList) {
  const list = [];
  inputList.forEach((row, y) => {
    row.split("").forEach((val, x) => {
      if (val !== ".") {
        list.push([val, x, y]);
      }
      return false;
    });
  });

  return list;
}

function isOutOfBound(x, y, rowLength, colLength) {
  return x < 0 || x >= colLength || y < 0 || y >= rowLength;
}

function calc(list, maxRow, maxCol) {
  const antinodes = new Set();

  for (let i = 0; i < list.length; i++) {
    const [curVal, curX, curY] = list[i];

    for (let j = i + 1; j < list.length; j++) {
      const [nextVal, nextX, nextY] = list[j];

      if (curVal === nextVal) {
        const x = curX - nextX;
        const y = curY - nextY;

        const antinode1 = [curX + x, curY + y];
        const antinode2 = [nextX - x, nextY - y];

        if (!isOutOfBound(antinode1[0], antinode1[1], maxRow, maxCol)) {
          antinodes.add(antinode1.join(","));
        }
        if (!isOutOfBound(antinode2[0], antinode2[1], maxRow, maxCol)) {
          antinodes.add(antinode2.join(","));
        }
      }
    }
  }

  return antinodes.size;
}

const antennasList = getAntennasList(input);

const answer = calc(antennasList, input.length, input[0].length);

console.log(answer);
