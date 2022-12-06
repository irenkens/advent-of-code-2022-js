import { getInput, printHeader } from './util';

const uniqueValues = array => {
  return [...new Set(array)].length === array.length;
};

const processsedCharacters = (letters, distinctCharacters) => {
  const window = letters.slice(0, distinctCharacters);

  if (uniqueValues(window)) return distinctCharacters;

  for (let i = distinctCharacters; i < letters.length; i++) {
    const letter = letters[i];
    window.shift();
    window.push(letter);
    if (uniqueValues(window)) return i + 1;
  }

  return -1;
};

const part1 = letters => {
  return processsedCharacters(letters, 4);
};

const part2 = letters => {
  return processsedCharacters(letters, 14);
};

export const day6 = async () => {
  const input = await getInput(__filename);
  const letters = input.split('');

  printHeader(__filename, 1);
  console.log(part1(letters));
  printHeader(__filename, 2);
  console.log(part2(letters));
};
