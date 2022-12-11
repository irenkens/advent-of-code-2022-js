/* eslint-disable no-param-reassign */
import { getInput, splitOnLineBreak, printHeader } from './util';

const moveTailRight = (head, tail) => {
  if (head.x - tail.x === 2) {
    tail.x++;
    if (head.y - tail.y >= 1) {
      tail.y++;
    }
    if (head.y - tail.y <= -1) {
      tail.y--;
    }
  }
};

const moveTailLeft = (head, tail) => {
  if (head.x - tail.x === -2) {
    tail.x--;
    if (head.y - tail.y >= 1) {
      tail.y++;
    }
    if (head.y - tail.y <= -1) {
      tail.y--;
    }
  }
};

const moveTailUp = (head, tail) => {
  if (head.y - tail.y === 2) {
    tail.y++;
    if (head.x - tail.x >= 1) {
      tail.x++;
    }
    if (head.x - tail.x <= -1) {
      tail.x--;
    }
  }
};

const moveTailDown = (head, tail) => {
  if (head.y - tail.y === -2) {
    tail.y--;
    if (head.x - tail.x >= 1) {
      tail.x++;
    }
    if (head.x - tail.x <= -1) {
      tail.x--;
    }
  }
};

const moveTail = (head, tail) => {
  if (head.x - tail.x === 2) moveTailRight(head, tail);
  if (head.y - tail.y === 2) moveTailUp(head, tail);
  if (head.y - tail.y === -2) moveTailDown(head, tail);
  if (head.x - tail.x === -2) moveTailLeft(head, tail);
};

const moveHeadAndTail = (head, tail, direction) => {
  if (direction === 'R') {
    head.x++;
    moveTailRight(head, tail);
  }
  if (direction === 'L') {
    head.x--;
    moveTailLeft(head, tail);
  }
  if (direction === 'U') {
    head.y++;
    moveTailUp(head, tail);
  }
  if (direction === 'D') {
    head.y--;
    moveTailDown(head, tail);
  }
};

const part1 = instructions => {
  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };
  const tailPositions = new Map();
  tailPositions.set('0,0', 1);

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i].split(' ');
    const direction = instruction[0];
    const steps = +instruction[1];

    for (let k = 0; k < steps; k++) {
      moveHeadAndTail(head, tail, direction);
      const positionCount = tailPositions.get(`${tail.x},${tail.y}`) || 0;
      tailPositions.set(`${tail.x},${tail.y}`, positionCount + 1);
    }
  }

  return tailPositions.size;
};

const part2 = instructions => {
  const knots = [];
  for (let i = 0; i < 10; i++) {
    knots.push({ x: 0, y: 0 });
  }

  const tailPositions = new Map();
  tailPositions.set('0,0', 1);

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i].split(' ');
    const direction = instruction[0];
    const steps = +instruction[1];

    for (let k = 0; k < steps; k++) {
      moveHeadAndTail(knots[0], knots[1], direction);
      for (let j = 1; j < knots.length - 1; j++) {
        moveTail(knots[j], knots[j + 1]);
      }
      const positionCount = tailPositions.get(`${knots[9].x},${knots[9].y}`) || 0;
      tailPositions.set(`${knots[9].x},${knots[9].y}`, positionCount + 1);
    }
  }

  return tailPositions.size;
};

export const day9 = async () => {
  const input = await getInput(__filename);
  const instructions = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(instructions));
  printHeader(__filename, 2);
  console.log(part2(instructions));
};
