/* eslint-disable prefer-destructuring */
import { isEmpty } from 'lodash';
import { getInput, splitOnLineBreak, printHeader } from './util';

const getSensorRanges = rules => {
  const ranges = [];
  rules.forEach(rule => {
    const split = rule.split(':').map(s => s.split('at ')[1]);

    const sensor = split[0].split(',');
    const sX = +sensor[0].split('x=')[1];
    const sY = +sensor[1].split('y=')[1];

    const beacon = split[1].split(',');
    const bX = +beacon[0].split('x=')[1];
    const bY = +beacon[1].split('y=')[1];

    const manhattanDistance = Math.abs(sX - bX) + Math.abs(sY - bY);

    const range = {
      left: sX - manhattanDistance,
      top: sY - manhattanDistance,
      right: sX + manhattanDistance,
      bottom: sY + manhattanDistance,
    };

    ranges.push(range);
  });

  return ranges;
};

// https://stackoverflow.com/questions/26390938/merge-arrays-with-overlapping-values
const mergeRanges = ranges => {
  const result = [];
  let last = [];

  ranges.forEach(r => {
    if (isEmpty(last) || r[0] > last[1]) {
      result.push(last = r);
    } else if (r[1] > last[1]) {
      last[1] = r[1];
    }
  });

  return result;
};

const getXCoverRanges = (sensorRanges, y) => {
  const coverage = [];

  for (let i = 0; i < sensorRanges.length; i++) {
    const sensorRange = sensorRanges[i];
    const { top, bottom, left, right } = sensorRange;
    // Line Y is within sensor range, calculate X range coverage
    if (top <= y && bottom >= y) {
      const sX = (top + bottom) / 2;
      const dX = Math.abs(y - sX);
      coverage.push([left + dX, right - dX]);
    }
  }

  // Sort & merge ranges that cover X positions
  coverage.sort((a, b) => (a[0] - b[0] !== 0 ? a[0] - b[0] : a[1] - b[1]));
  return mergeRanges(coverage);
};

const part1 = rules => {
  const sensorRanges = getSensorRanges(rules);
  const ranges = getXCoverRanges(sensorRanges, 2000000);
  return ranges.map(range => range[1] - range[0]).reduce((a, b) => a + b, 0);
};

const part2 = rules => {
  const sensorRanges = getSensorRanges(rules);

  for (let y = 0; y <= 4000000; y++) {
    const ranges = getXCoverRanges(sensorRanges, y);
    if (ranges.length === 2) {
      const x = (ranges[1][0] + ranges[0][1]) / 2;
      return x * 4000000 + y;
    }
  }

  return null;
};

export const day15 = async () => {
  const input = await getInput(__filename);
  const rules = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(rules));
  printHeader(__filename, 2);
  console.log(part2(rules));
};
