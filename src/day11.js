/* eslint-disable no-eval */
import { cloneDeep } from 'lodash';
import { getInput, splitOnEmptyLine, splitOnLineBreak, printHeader } from './util';

const processInput = input => {
  const monkeys = splitOnEmptyLine(input);
  const monkeyList = [];

  for (let i = 0; i < monkeys.length; i++) {
    const monkey = splitOnLineBreak(monkeys[i]);
    const startingItems = monkey[1].split('Starting items: ')[1].split(', ').map(x => +x);
    const operation = monkey[2].split('Operation: new = ')[1];
    const test = +monkey[3].split('Test: divisible by ')[1];
    const testTrue = +monkey[4].split('If true: throw to monkey ')[1];
    const testFalse = +monkey[5].split('If false: throw to monkey ')[1];

    monkeyList[i] = {
      items: startingItems,
      operation,
      test,
      testTrue,
      testFalse,
      inspectTimes: 0,
    };
  }

  return monkeyList;
};

const part1 = monkeys => {
  const ROUNDS = 20;

  for (let i = 0; i < ROUNDS; i++) {
    for (let m = 0; m < monkeys.length; m++) {
      const monkey = monkeys[m];
      const { items, operation, test, testTrue, testFalse } = monkey;
      for (let k = 0; k < items.length; k++) {
        monkey.inspectTimes++;
        const worryLevel = items[k];
        const newWorryLevel = Math.floor(eval(operation.replaceAll('old', worryLevel)) / 3);
        const toMonkey = (newWorryLevel % test) === 0 ? testTrue : testFalse;
        monkeys[toMonkey].items.push(newWorryLevel);
      }

      monkey.items = [];
    }
  }

  const activity = monkeys.map(m => m.inspectTimes).sort((a, b) => b - a);
  return activity[0] * activity[1];
};

const part2 = monkeys => {
  const ROUNDS = 10000;
  const commonDenominator = monkeys.map(m => m.test).reduce((a, b) => a * b, 1);

  for (let i = 0; i < ROUNDS; i++) {
    for (let m = 0; m < monkeys.length; m++) {
      const monkey = monkeys[m];
      const { items, operation, test, testTrue, testFalse } = monkey;
      for (let k = 0; k < items.length; k++) {
        monkey.inspectTimes++;
        const worryLevel = items[k] % commonDenominator;
        const newWorryLevel = eval(operation.replaceAll('old', worryLevel));
        const toMonkey = (newWorryLevel % test) === 0 ? testTrue : testFalse;
        monkeys[toMonkey].items.push(newWorryLevel);
      }

      monkey.items = [];
    }
  }

  const activity = monkeys.map(m => m.inspectTimes).sort((a, b) => b - a);
  return activity[0] * activity[1];
};

export const day11 = async () => {
  const input = await getInput(__filename);
  const monkeys = processInput(input);

  printHeader(__filename, 1);
  console.log(part1(cloneDeep(monkeys)));
  printHeader(__filename, 2);
  console.log(part2(cloneDeep(monkeys)));
};
