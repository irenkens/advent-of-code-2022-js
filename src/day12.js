import { getInput, splitOnLineBreak, printHeader } from './util';

const getNumeric = letter => {
  if (letter === 'S') return 'a'.charCodeAt(0) - 97;
  if (letter === 'E') return 'z'.charCodeAt(0) - 97;

  return letter.charCodeAt(0) - 97;
};

const getNeighbours = (x, y, grid) => {
  const neighbours = [];
  const up = grid[y - 1]?.[x];
  const down = grid[y + 1]?.[x];
  const left = grid[y]?.[x - 1];
  const right = grid[y]?.[x + 1];

  if (up) {
    neighbours.push({ x, y: y - 1, value: getNumeric(up) });
  }

  if (down) {
    neighbours.push({ x, y: y + 1, value: getNumeric(down) });
  }

  if (left) {
    neighbours.push({ x: x - 1, y, value: getNumeric(left) });
  }

  if (right) {
    neighbours.push({ x: x + 1, y, value: getNumeric(right) });
  }

  return neighbours;
};

const getShortestPath = (start, end, grid) => {
  const queue = [];
  const visited = [];

  visited.push(start);
  queue.push([start]);

  let shortest = Infinity;

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node.x === end.x && node.y === end.y && path.length - 1 < shortest) {
      shortest = path.length - 1;
    }

    const { x, y } = node;
    const neighbours = getNeighbours(x, y, grid);
    for (let i = 0; i < neighbours.length; i++) {
      const point = { x: neighbours[i].x, y: neighbours[i].y, value: neighbours[i].value };
      if (point.value > node.value + 1) continue;
      if (visited.find(p => p.x === point.x && p.y === point.y)) continue;

      const newPath = [...path];
      newPath.push(point);
      queue.push(newPath);
      visited.push(point);
    }
  }

  return shortest;
};

const part1 = grid => {
  const startY = grid.indexOf(grid.find(x => x.includes('S')));
  const startX = grid[startY].indexOf('S');
  const endY = grid.indexOf(grid.find(x => x.includes('E')));
  const endX = grid[endY].indexOf('E');

  const start = { x: startX, y: startY, value: getNumeric('S') };
  const end = { x: endX, y: endY, value: getNumeric('E') };

  return getShortestPath(start, end, grid);
};

const part2 = grid => {
  const startingPoints = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === 'a') {
        startingPoints.push({ x: j, y: i, value: getNumeric('a') });
      }
    }
  }

  const endY = grid.indexOf(grid.find(x => x.includes('E')));
  const endX = grid[endY].indexOf('E');
  const end = { x: endX, y: endY, value: getNumeric('E') };

  return Math.min(...startingPoints.map(start => getShortestPath(start, end, grid)));
};

export const day12 = async () => {
  const input = await getInput(__filename);
  const grid = splitOnLineBreak(input).map(line => line.split(''));

  printHeader(__filename, 1);
  console.log(part1(grid));
  printHeader(__filename, 2);
  console.log(part2(grid));
};
