/* eslint-disable prefer-destructuring */
import { getInput, splitOnLineBreak, printHeader } from './util';

const createList = numbers => {
  const list = new Map();
  list.set(0, { value: numbers[0], previous: numbers.length - 1, next: 1 });
  for (let i = 1; i < numbers.length - 1; i++) {
    list.set(i, {
      value: numbers[i],
      previous: i - 1,
      next: i + 1,
    });
  }
  list.set(numbers.length - 1, { value: numbers[numbers.length - 1], previous: numbers.length - 2, next: 0 });
  return list;
};

const moveLeft = (id, list) => {
  const current = list.get(id);
  const previous = list.get(current.previous);
  const next = list.get(current.next);

  previous.next = current.next;
  next.previous = current.previous;

  let test = id;
  for (let i = 0; i < current.value * -1 + 1; i++) {
    test = list.get(test).previous;
  }

  const newPrevious = list.get(test);
  const newNext = list.get(newPrevious.next);
  newNext.previous = id;
  const moving = list.get(id);
  moving.previous = test;
  moving.next = newPrevious.next;
  newPrevious.next = id;
};

const moveRight = (id, list) => {
  const current = list.get(id);
  const previous = list.get(current.previous);
  const next = list.get(current.next);

  previous.next = current.next;
  next.previous = current.previous;

  let test = id;
  for (let i = 0; i < current.value; i++) {
    test = list.get(test).next;
  }

  const newPrevious = list.get(test);
  const newNext = list.get(newPrevious.next);
  newNext.previous = id;
  const moving = list.get(id);
  moving.previous = test;
  moving.next = newPrevious.next;
  newPrevious.next = id;
};

// TODO: refactor this crap
const part1 = numbers => {
  const list = createList(numbers);

  for (let i = 0; i < numbers.length; i++) {
    const id = i;
    if (numbers[id] < 0) moveLeft(id, list);
    if (numbers[id] > 0) moveRight(id, list);
  }

  const thousand = 1000 % numbers.length;
  const twoThousand = 2000 % numbers.length;
  const threeThousand = 3000 % numbers.length;

  let one = list.get(numbers.indexOf(0));

  for (let i = 0; i < thousand; i++) {
    one = list.get(one.next);
  }

  let two = list.get(numbers.indexOf(0));
  for (let i = 0; i < twoThousand; i++) {
    two = list.get(two.next);
  }

  let three = list.get(numbers.indexOf(0));
  for (let i = 0; i < threeThousand; i++) {
    three = list.get(three.next);
  }

  return one.value + two.value + three.value;
};

const part2 = numbers => {
  return null;
};

export const day20 = async () => {
  const input = await getInput(__filename);
  const numbers = splitOnLineBreak(input).map(x => +x);

  printHeader(__filename, 1);
  console.log(part1(numbers));
  printHeader(__filename, 2);
  console.log(part2(numbers));
};
