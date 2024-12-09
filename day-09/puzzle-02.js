const fs = require("fs");
const filename = "./input.txt";
const input = fs.readFileSync(filename, "utf8").trim().split("");

function generateBlocks(inputList) {
  let output = [];
  for (let i = 0, id = 0; i < inputList.length; i++) {
    const num = Number(inputList[i]);
    output.push({
      id: i % 2 === 0 ? id++ : -1,
      count: num,
    });
  }
  return output.filter((val) => val.count > 0);
}

function moveBlock(blocks) {
  for (let i = blocks.length - 1; i > 0; i--) {
    const cur = blocks[i];

    if (cur.id === -1) {
      continue;
    }

    const emptyIndex = blocks.findIndex(
      (val) => val.id === -1 && val.count >= cur.count,
    );

    if (emptyIndex !== -1 && emptyIndex < i) {
      const tempId = cur.id;
      if (blocks[emptyIndex].count === cur.count) {
        cur.id = -1;
        blocks[emptyIndex].id = tempId;
      } else {
        cur.id = -1;
        const add = [
          { id: tempId, count: cur.count },
          {
            id: blocks[emptyIndex].id,
            count: blocks[emptyIndex].count - cur.count,
          },
        ];
        blocks.splice(emptyIndex, 1, ...add);
        i++;
      }
    }
  }
}

function calc(blocks) {
  let total = 0;
  let index = 0;

  for (const block of blocks) {
    for (let i = 0; i < block.count; i++) {
      if (block.id !== -1) {
        total += index * block.id;
      }
      index++;
    }
  }

  return total;
}

const blocks = generateBlocks(input);
moveBlock(blocks);
const answer = calc(blocks);

console.log(answer);
