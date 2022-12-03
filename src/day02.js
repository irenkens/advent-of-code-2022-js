/* eslint-disable no-nested-ternary */
import { getInput, splitOnLineBreak, printHeader } from './util';

const shapePoints = {
  A: 1,
  B: 2,
  C: 3,

  X: 1,
  Y: 2,
  Z: 3,
};

const roundScore = (opponent, me) => {
  let outcome = 0;

  if (shapePoints[opponent] === shapePoints[me]) {
    outcome = 3;
  } else if (me === 'X' && opponent === 'C') {
    outcome = 6;
  } else if (me === 'Y' && opponent === 'A') {
    outcome = 6;
  } else if (me === 'Z' && opponent === 'B') {
    outcome = 6;
  } else {
    outcome = 0;
  }

  return outcome + shapePoints[me];
};

const getMove = moves => {
  const [opponent, outcome] = moves;

  if (outcome === 'Y') {
    return opponent;
  }

  if (outcome === 'X') {
    return opponent === 'A' ? 'Z' : opponent === 'B' ? 'X' : 'Y';
  }

  return opponent === 'A' ? 'Y' : opponent === 'B' ? 'Z' : 'X';
};

const part1 = rounds => {
  let sum = 0;
  for (let i = 0; i < rounds.length; i++) {
    const moves = rounds[i].split(' ');
    const score = roundScore(moves[0], moves[1]);
    sum += score;
  }

  return sum;
};

const part2 = rounds => {
  let sum = 0;
  for (let i = 0; i < rounds.length; i++) {
    const moves = rounds[i].split(' ');
    const choice = getMove(moves);
    const score = roundScore(moves[0], choice);
    sum += score;
  }

  return sum;
};

export const day2 = async () => {
  const input = await getInput(__filename);
  const rounds = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(rounds));
  printHeader(__filename, 2);
  console.log(part2(rounds));
};
