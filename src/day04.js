import { getInput, splitOnLineBreak, printHeader } from './util';

const getSections = assignment => {
  const split = assignment.split('-');
  const start = +split[0];
  const end = +split[1];
  return Array.from(Array(end - start + 1).keys()).map(x => x + start);
};

const getSectionsPerElf = pair => {
  const split = pair.split(',');
  const elfOne = getSections(split[0]);
  const elfTwo = getSections(split[1]);

  return [elfOne, elfTwo];
};

const part1 = pairs => {
  let sum = 0;
  for (let i = 0; i < pairs.length; i++) {
    const [elfOne, elfTwo] = getSectionsPerElf(pairs[i]);

    if (elfOne.every(x => elfTwo.includes(x)) || elfTwo.every(x => elfOne.includes(x))) {
      sum++;
    }
  }

  return sum;
};

const part2 = pairs => {
  let sum = 0;
  for (let i = 0; i < pairs.length; i++) {
    const [elfOne, elfTwo] = getSectionsPerElf(pairs[i]);

    if (elfOne.some(x => elfTwo.includes(x))) {
      sum++;
    }
  }

  return sum;
};

export const day4 = async () => {
  const input = await getInput(__filename);
  const pairs = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(pairs));
  printHeader(__filename, 2);
  console.log(part2(pairs));
};
