import { getInput, splitOnLineBreak, printHeader } from './util';

const getTopNeighbours = (tree, grid) => {
  const { r, c } = tree;
  if (r === 0) return [];

  const neighbours = [];
  for (let i = r - 1; i >= 0; i--) {
    neighbours.push(grid[i][c]);
  }

  return neighbours;
};

const getBottomNeighbours = (tree, grid) => {
  const { r, c } = tree;
  const rows = grid[0].length;
  if (r === rows - 1) return [];

  const neighbours = [];
  for (let i = r + 1; i < rows; i++) {
    neighbours.push(grid[i][c]);
  }

  return neighbours;
};

const getLeftNeighbours = (tree, grid) => {
  const { r, c } = tree;
  if (c === 0) return [];

  const neighbours = [];
  for (let i = c - 1; i >= 0; i--) {
    neighbours.push(grid[r][i]);
  }

  return neighbours;
};

const getRightNeighbours = (tree, grid) => {
  const { r, c } = tree;
  if (c === grid.length - 1) return [];

  const neighbours = [];
  for (let i = c + 1; i < grid.length; i++) {
    neighbours.push(grid[r][i]);
  }

  return neighbours;
};

const isVisible = (tree, allNeighbours) => {
  // tree on the edge
  if (allNeighbours.some(n => n.length === 0)) return true;

  for (let i = 0; i < allNeighbours.length; i++) {
    const neighbours = allNeighbours[i];
    if (neighbours.every(t => t < tree)) return true;
  }

  return false;
};

const getScenicScore = (tree, allNeighbours) => {
  let score = 1;

  for (let i = 0; i < allNeighbours.length; i++) {
    const neighbours = allNeighbours[i];

    let viewingDistance = 0;
    for (let k = 0; k < neighbours.length; k++) {
      viewingDistance++;
      if (neighbours[k] >= tree) {
        break;
      }
    }

    score *= viewingDistance;
  }

  return score;
};

const part1 = grid => {
  const columns = grid.length;
  const rows = grid[0].length;

  let visibleTrees = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const tree = grid[r][c];
      const top = getTopNeighbours({ r, c }, grid);
      const bottom = getBottomNeighbours({ r, c }, grid);
      const left = getLeftNeighbours({ r, c }, grid);
      const right = getRightNeighbours({ r, c }, grid);

      visibleTrees += +isVisible(tree, [top, bottom, left, right]);
    }
  }

  return visibleTrees;
};

const part2 = grid => {
  const columns = grid.length;
  const rows = grid[0].length;

  let bestScore = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const tree = grid[r][c];
      const top = getTopNeighbours({ r, c }, grid);
      const bottom = getBottomNeighbours({ r, c }, grid);
      const left = getLeftNeighbours({ r, c }, grid);
      const right = getRightNeighbours({ r, c }, grid);

      const scenicScore = getScenicScore(tree, [top, bottom, left, right]);
      bestScore = scenicScore > bestScore ? scenicScore : bestScore;
    }
  }

  return bestScore;
};

export const day8 = async () => {
  const input = await getInput(__filename);
  const grid = splitOnLineBreak(input).map(x => x.split('').map(z => +z));

  printHeader(__filename, 1);
  console.log(part1(grid));
  printHeader(__filename, 2);
  console.log(part2(grid));
};
