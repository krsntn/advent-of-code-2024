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
    antinodes.add([curX, curY].join(","));

    for (let j = i + 1; j < list.length; j++) {
      const [nextVal, nextX, nextY] = list[j];
      antinodes.add([nextX, nextY].join(","));

      if (curVal === nextVal) {
        let dir1 = true;
        let dir2 = true;
        const x = curX - nextX;
        const y = curY - nextY;

        let tempCurX = curX;
        let tempCurY = curY;
        let tempNextX = nextX;
        let tempNextY = nextY;

        while (dir1) {
          const antinode1 = [tempCurX + x, tempCurY + y];
          if (isOutOfBound(antinode1[0], antinode1[1], maxRow, maxCol)) {
            dir1 = false;
          } else {
            antinodes.add(antinode1.join(","));
            tempCurX = antinode1[0];
            tempCurY = antinode1[1];
          }
        }

        while (dir2) {
          const antinode2 = [tempNextX - x, tempNextY - y];
          if (isOutOfBound(antinode2[0], antinode2[1], maxRow, maxCol)) {
            dir2 = false;
          } else {
            antinodes.add(antinode2.join(","));
            tempNextX = antinode2[0];
            tempNextY = antinode2[1];
          }
        }
      }
    }
  }

  return antinodes.size;
}

const antennasList = getAntennasList(input);

const answer = calc(antennasList, input.length, input[0].length);

console.log(answer);
