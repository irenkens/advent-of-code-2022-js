/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { getInput, printHeader } from './util';

const HORIZONTAL = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }];
const CROSS = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }];
const CORNER = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }];
const VERTICAL = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }];
const SQUARE = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];

const ROCK = Object.freeze({
  HORIZONTAL: 'HORIZONTAL',
  CROSS: 'CROSS',
  CORNER: 'CORNER',
  VERTICAL: 'VERTICAL',
  SQUARE: 'SQUARE',
});

const ROCK_MAP = {
  [ROCK.HORIZONTAL]: HORIZONTAL,
  [ROCK.CROSS]: CROSS,
  [ROCK.CORNER]: CORNER,
  [ROCK.VERTICAL]: VERTICAL,
  [ROCK.SQUARE]: SQUARE,
};

const rocks = [ROCK.HORIZONTAL, ROCK.CROSS, ROCK.CORNER, ROCK.VERTICAL, ROCK.SQUARE];

const pushRight = (rock, chamber) => {
  const move = rock.map(r => { return { x: r.x + 1, y: r.y }; });
  if (move.every(block => block.x < 7) && move.every(block => chamber[block.y]?.[block.x] !== '#')) return move;
  return rock;
};

const pushLeft = (rock, chamber) => {
  const move = rock.map(r => { return { x: r.x - 1, y: r.y }; });
  if (move.every(block => block.x > -1) && move.every(block => chamber[block.y]?.[block.x] !== '#')) return move;
  return rock;
};

const pushRock = (rock, jet, chamber) => {
  return jet === '<' ? pushLeft(rock, chamber) : pushRight(rock, chamber);
};

const pushDown = rock => {
  return rock.map(r => { return { x: r.x, y: r.y - 1 }; });
};

const updateChamber = (chamber, rock) => {
  rock.forEach(block => {
    if (chamber[block.y] == null) {
      chamber[block.y] = new Array(7).fill('.');
    }
    chamber[block.y][block.x] = '#';
  });

  // remove top empty lines
  for (let i = chamber.length - 1; i >= 0; i--) {
    if (chamber[i].every(x => x !== '#')) {
      chamber.pop();
      continue;
    }
    break;
  }
};

// const printChamber = chamber => {
//   console.log('---- chamber ----');
//   for (let i = chamber.length - 1; i >= 0; i--) {
//     console.log(chamber[i].join(''));
//   }
// };

const part1 = jetPattern => {
  const chamber = [];
  const emptyLine = new Array(7).fill('.');
  const ROCKS_FALLING = 2022;

  for (let i = 0; i < ROCKS_FALLING; i++) {
    chamber.push([...emptyLine]);
    chamber.push([...emptyLine]);
    chamber.push([...emptyLine]);

    const rockType = rocks.shift();
    rocks.push(rockType);
    const rock = ROCK_MAP[rockType];
    const chamberHeight = chamber.length;
    let fallingRock = rock.map(r => { return { x: r.x + 2, y: r.y + chamberHeight }; });
    let isFalling = true;

    while (isFalling) {
      const jet = jetPattern.shift();
      jetPattern.push(jet);
      fallingRock = pushRock(fallingRock, jet, chamber);

      if (fallingRock.some(block => block.y === 0) || fallingRock.some(block => chamber[block.y - 1]?.[block.x] === '#')) {
        updateChamber(chamber, fallingRock);
        isFalling = false;
      }

      fallingRock = pushDown(fallingRock, jet);
    }
  }

  return chamber.length;
};

const part2 = jetPattern => {
  return null;
};

export const day17 = async () => {
  const input = await getInput(__filename);
  const jetPattern = input.split('');

  printHeader(__filename, 1);
  console.log(part1(jetPattern));
  printHeader(__filename, 2);
  console.log(part2(jetPattern));
};
