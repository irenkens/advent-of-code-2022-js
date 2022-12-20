/* eslint-disable no-loop-func */
/* eslint-disable no-constant-condition */
/* eslint-disable no-param-reassign */
import { getInput, splitOnLineBreak, printHeader } from './util';

const dropSand = (x, y, grid) => {
  if (x < 0 || x >= grid[0].length || y >= grid.length) return { x, y };

  while (!['#', 'o'].includes(grid[y + 1][x])) {
    y++;
  }

  if (y > grid.length) return { x, y };

  if (!['#', 'o'].includes(grid[y + 1][x - 1])) {
    x--;
    y++;
    return dropSand(x, y, grid);
  }

  if (!['#', 'o'].includes(grid[y + 1][x + 1])) {
    x++;
    y++;
    return dropSand(x, y, grid);
  }

  return { x, y };
};

const getRocks = (paths, offset = 0) => {
  let smallestX = Infinity;
  let smallestY = Infinity;
  let biggestX = 0;
  let biggestY = 0;

  const rocks = [];

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const lines = path.split(' -> ');

    const coordinates = lines.map(line => {
      const points = line.split(',');
      const x = +points[0];
      const y = +points[1];

      if (y > biggestY) {
        biggestY = y;
      }

      if (x > biggestX) {
        biggestX = x + offset;
      }

      if (y < smallestY) {
        smallestY = y;
      }

      if (x < smallestX) {
        smallestX = x - offset;
      }

      return { x, y };
    });
    rocks.push(coordinates);
  }

  return { rocks, smallestX, biggestX, biggestY };
};

const getGrid = (rocks, smallestX, biggestX, biggestY) => {
  const grid = [];
  for (let y = 0; y <= biggestY; y++) {
    grid[y] = [];
    for (let x = 0; x <= biggestX - smallestX; x++) {
      grid[y][x] = '.';
    }
  }

  for (let i = 0; i < rocks.length; i++) {
    const rock = rocks[i];
    for (let k = 0; k < rock.length - 1; k++) {
      const first = rock[k];
      const second = rock[k + 1];

      const smallX = Math.min(first.x, second.x);
      const smallY = Math.min(first.y, second.y);
      const bigX = Math.max(first.x, second.x);
      const bigY = Math.max(first.y, second.y);

      for (let j = smallX - smallestX; j <= bigX - smallestX; j++) {
        grid[first.y][j] = '#';
      }

      for (let j = smallY; j < bigY + 1; j++) {
        grid[j][first.x - smallestX] = '#';
      }
    }
  }

  return { grid };
};

const part1 = paths => {
  const { rocks, smallestX, biggestX, biggestY } = getRocks(paths);
  const { grid } = getGrid(rocks, smallestX, biggestX, biggestY);

  let units = 0;

  while (true) {
    const sand = dropSand(500 - smallestX, 0, grid);

    if (sand.x < 0 || sand.x >= grid[0].length || sand.y >= grid.length) {
      break;
    }

    units++;
    grid[sand.y][sand.x] = 'o';
  }

  // draw it :D
  // const lines = grid.map(x => x.join(''));
  // lines.forEach(line => console.log(line));

  return units;
};

const part2 = paths => {
  const offset = 1000; // offset to left and right side of grid
  const { rocks, smallestX, biggestX, biggestY } = getRocks(paths, offset);
  const { grid } = getGrid(rocks, smallestX, biggestX, biggestY);

  grid.push(new Array(grid[0].length).fill('.'));
  grid.push(new Array(grid[0].length + offset).fill('#'));

  let units = 0;

  while (true) {
    const sand = dropSand(500 - smallestX, 0, grid);

    units++;
    grid[sand.y][sand.x] = 'o';

    if (sand.y === 0) {
      break;
    }
  }

  return units;
};

export const day14 = async () => {
  const input = await getInput(__filename);
  const paths = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(paths));
  printHeader(__filename, 2);
  console.log(part2(paths));
};
