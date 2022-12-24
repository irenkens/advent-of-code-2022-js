import { getInput, splitOnLineBreak, printHeader } from './util';

const part1 = coordinates => {
  const coords = coordinates.map(x => {
    const split = x.split(',');
    return { x: +split[0], y: +split[1], z: +split[2] };
  });

  let result = 0;
  for (let i = 0; i < coords.length; i++) {
    const { x, y, z } = coords[i];
    let exposed = 6;

    const left = x - 1;
    const right = x + 1;
    const top = y + 1;
    const bottom = y - 1;
    const front = z - 1;
    const back = z + 1;

    if (coords.find(c => c.x === left && c.y === y && c.z === z) != null) exposed--;
    if (coords.find(c => c.x === right && c.y === y && c.z === z) != null) exposed--;
    if (coords.find(c => c.x === x && c.y === top && c.z === z) != null) exposed--;
    if (coords.find(c => c.x === x && c.y === bottom && c.z === z) != null) exposed--;
    if (coords.find(c => c.x === x && c.y === y && c.z === front) != null) exposed--;
    if (coords.find(c => c.x === x && c.y === y && c.z === back) != null) exposed--;

    result += exposed;
  }

  return result;
};

const part2 = coordinates => {
  return null;
};

export const day18 = async () => {
  const input = await getInput(__filename);
  const coordinates = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(coordinates));
  printHeader(__filename, 2);
  console.log(part2(coordinates));
};
