import { getInput, splitOnLineBreak, printHeader } from './util';

const part1 = rucksacks => {
  let sum = 0;

  for (let i = 0; i < rucksacks.length; i++) {
    const rucksack = rucksacks[i];
    const half = Math.ceil(rucksack.length / 2);
    const firstHalf = rucksack.slice(0, half);
    const secondHalf = rucksack.slice(half);
    const intersection = [...firstHalf].filter(x => [...secondHalf].includes(x)).toString();
    const charCode = intersection.charCodeAt(0);
    const priority = charCode > 96 ? charCode - 96 : charCode - 38;
    sum += priority;
  }

  return sum;
};

const part2 = rucksacks => {
  let sum = 0;

  for (let i = 0; i < rucksacks.length; i += 3) {
    const rucksack1 = rucksacks[i];
    const rucksack2 = rucksacks[i + 1];
    const rucksack3 = rucksacks[i + 2];

    const intersection = [...rucksack1]
      .filter(x => [...rucksack2].includes(x) && [...rucksack3].includes(x))
      .toString();
    const charCode = intersection.charCodeAt(0);
    const priority = charCode > 96 ? charCode - 96 : charCode - 38;
    sum += priority;
  }

  return sum;
};

export const day3 = async () => {
  const input = await getInput(__filename);
  const rucksacks = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(rucksacks));
  printHeader(__filename, 2);
  console.log(part2(rucksacks));
};
