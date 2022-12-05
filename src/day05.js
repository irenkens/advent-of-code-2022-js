import { cloneDeep } from 'lodash';
import { getInput, splitOnEmptyLine, splitOnLineBreak, printHeader } from './util';

const topCrates = stacks => {
  let message = '';
  for (let i = 0; i < stacks.length; i++) {
    const top = stacks[i].pop();
    message += top;
  }

  return message;
};

const part1 = (stacks, rules) => {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const split = rule.split(' from ');
    const amount = split[0].split(' ')[1];
    const [from, to] = split[1].split(' to ');

    for (let k = 0; k < amount; k++) {
      const crate = stacks[from - 1].pop();
      stacks[to - 1].push(crate);
    }
  }

  return topCrates(stacks);
};

const part2 = (stacks, rules) => {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const split = rule.split(' from ');
    const amount = split[0].split(' ')[1];
    const [from, to] = split[1].split(' to ');

    const crates = stacks[from - 1].splice(-amount);
    // eslint-disable-next-line no-param-reassign
    stacks[to - 1] = stacks[to - 1].concat(crates);
  }

  return topCrates(stacks);
};

export const day5 = async () => {
  const input = await getInput(__filename);
  const [crates, ruleList] = splitOnEmptyLine(input);
  const rules = splitOnLineBreak(ruleList);

  // create stacks
  const split = splitOnLineBreak(crates);
  const numberOfStacks = Math.max(...split[split.length - 1].split(' ').map(x => +x));
  const stacks = Array.from(Array(numberOfStacks), () => []);

  for (let i = numberOfStacks - 2; i >= 0; i--) {
    const line = split[i];
    for (let j = 0; j < numberOfStacks; j++) {
      const crate = line[1 + 4 * j];
      if (crate === ' ') continue;
      stacks[j].push(crate);
    }
  }

  printHeader(__filename, 1);
  console.log(part1(cloneDeep(stacks), rules));
  printHeader(__filename, 2);
  console.log(part2(cloneDeep(stacks), rules));
};
