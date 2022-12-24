import { getInput, splitOnLineBreak, printHeader } from './util';

const getValue = (val1, val2, operator) => {
  switch (operator) {
    case '+':
      return val1 + val2;
    case '-':
      return val1 - val2;
    case '*':
      return val1 * val2;
    case '/':
      return val1 / val2;
    default:
      return null;
  }
};

const part1 = lines => {
  const known = new Map();
  const unknown = new Map();

  lines.forEach(line => {
    const split = line.split(' ');
    const monkey = split[0].slice(0, -1);

    if (split.length === 2) {
      const value = +split[1];
      known.set(monkey, value);
    } else {
      const need = [split[1], split[3]];
      const operator = split[2];
      unknown.set(monkey, { need, operator });
    }
  });

  while (unknown.size > 0) {
    unknown.forEach((monkey, key) => {
      const { need, operator } = monkey;
      if (need.every(m => known.has(m))) {
        const m1 = known.get(need[0]);
        const m2 = known.get(need[1]);
        const value = getValue(m1, m2, operator);
        known.set(key, value);
        unknown.delete(key);
      }
    });
  }

  return known.get('root');
};

const part2 = lines => {
  return null;
};

export const day21 = async () => {
  const input = await getInput(__filename);
  const lines = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(lines));
  printHeader(__filename, 2);
  console.log(part2(lines));
};
