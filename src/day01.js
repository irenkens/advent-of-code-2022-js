import { getInput, splitOnEmptyLine, splitOnLineBreak, printHeader } from './util';

const part1 = listPerElf => {
  return Math.max(...listPerElf.map(list => list.reduce((a, b) => a + b, 0)));
};

const part2 = listPerElf => {
  const sorted = listPerElf.map(list => list.reduce((a, b) => a + b, 0)).sort((a, b) => b - a);
  return sorted[0] + sorted[1] + sorted[2];
};

export const day1 = async () => {
  const input = await getInput(__filename);
  const listPerElf = splitOnEmptyLine(input).map(elf => splitOnLineBreak(elf).map(calories => +calories));

  printHeader(__filename, 1);
  console.log(part1(listPerElf));
  printHeader(__filename, 2);
  console.log(part2(listPerElf));
};
