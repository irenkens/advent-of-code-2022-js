import { getInput, splitOnLineBreak, printHeader } from './util';

const part1 = instructions => {
  let value = 1;
  let cycle = 0;
  const valuePerCycle = new Map();

  for (let i = 0; i < instructions.length; i++) {
    cycle++;
    valuePerCycle.set(cycle, value);

    if (instructions[i] === 'noop') {
      continue;
    }

    cycle++;
    valuePerCycle.set(cycle, value);
    value += +(instructions[i].split(' ')[1]);
  }
  valuePerCycle.set(cycle, value);

  return [20, 60, 100, 140, 180, 220].reduce((result, x) => result + valuePerCycle.get(x) * x, 0);
};

const part2 = instructions => {
  let spritePosition = 1;
  let cycle = 0;

  const crt = [];

  for (let i = cycle; i < instructions.length; i++) {
    cycle++;
    const sprite = [spritePosition - 1, spritePosition, spritePosition + 1];

    if (sprite.includes((cycle - 1) % 40)) crt.push('#');
    else crt.push(' ');

    if (instructions[i] === 'noop') {
      continue;
    }

    cycle++;

    if (sprite.includes((cycle - 1) % 40)) crt.push('#');
    else crt.push(' ');

    spritePosition += +(instructions[i].split(' ')[1]);
  }

  for (let i = 0; i < 240; i += 40) {
    const line = crt.slice(i, i + 40).reduce((a, b) => `${a}${b}`, '');
    console.log(line);
  }
};

export const day10 = async () => {
  const input = await getInput(__filename);
  const instructions = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(instructions));
  printHeader(__filename, 2);
  part2(instructions);
};
