import { getInput, splitOnEmptyLine, splitOnLineBreak, printHeader } from './util';

const DIRECTION = Object.freeze({
  RIGHT: 0,
  DOWN: 1,
  LEFT: 2,
  UP: 3,
});

const modNegative = (n, m) => {
  return ((n % m) + m) % m;
};

const part1 = (map, path) => {
  const grid = splitOnLineBreak(map).map(x => x.split(''));
  const instructions = path.match(/[R|L]|[0-9]+/g);

  let facing = DIRECTION.RIGHT;
  let y = 0;
  let x = grid[y].indexOf('.');

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    if (instruction === 'R') {
      facing = (facing + 1) % 4;
      continue;
    }

    if (instruction === 'L') {
      facing = modNegative(facing - 1, 4);
      continue;
    }

    const move = +instruction;
    for (let m = 0; m < move; m++) {
      if (facing === DIRECTION.RIGHT) {
        let nextX = (x + 1) % grid[y].length;
        while (grid[y][nextX] === ' ') {
          nextX = (nextX + 1) % grid[y].length;
        }
        if (grid[y][nextX] === '#') break;
        else x = nextX;
      }

      if (facing === DIRECTION.LEFT) {
        let nextX = modNegative(x - 1, grid[y].length);
        while (grid[y][nextX] === ' ') {
          nextX = modNegative(nextX - 1, grid[y].length);
        }
        if (grid[y][nextX] === '#') break;
        else x = nextX;
      }

      if (facing === DIRECTION.DOWN) {
        let nextY = (y + 1) % grid.length;
        while (grid[nextY][x] === ' ') {
          nextY = (nextY + 1) % grid.length;
        }
        if (grid[nextY][x] === '#') break;
        else y = nextY;
      }

      if (facing === DIRECTION.UP) {
        let nextY = modNegative(y - 1, grid.length);
        while (grid[nextY][x] === ' ') {
          nextY = modNegative(nextY - 1, grid.length);
        }
        if (grid[nextY][x] === '#') break;
        else y = nextY;
      }
    }
  }

  return ((y + 1) * 1000) + (4 * (x + 1)) + facing;
};

const part2 = lines => {
  return null;
};

export const day22 = async () => {
  const input = await getInput(__filename);
  const [map, path] = splitOnEmptyLine(input);

  printHeader(__filename, 1);
  console.log(part1(map, path));
  printHeader(__filename, 2);
  console.log(part2(map, path));
};
