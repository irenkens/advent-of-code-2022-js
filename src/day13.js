/* eslint-disable no-eval */
import { getInput, splitOnEmptyLine, splitOnLineBreak, printHeader } from './util';

const isRightOrder = (leftList, rightList) => {
  for (let i = 0; i < leftList.length; i++) {
    let left = leftList[i];
    let right = rightList[i];

    // right list runs out of items first
    if (right == null) return false;

    const isArray1 = Array.isArray(left);
    const isArray2 = Array.isArray(right);

    // both values are integers
    if (!isArray1 && !isArray2) {
      if (left === right) continue;
      if (left < right) return true;
      return false;
    }

    // left is integer, right is list
    if (!isArray1) {
      left = [left];
    }

    // left is list, right is integer
    if (!isArray2) {
      right = [right];
    }

    // check lists again
    const result = isRightOrder(left, right);
    if (result == null) continue;
    return result;
  }

  // lists are same length, inconclusive result
  if (leftList.length === rightList.length) {
    return null;
  }

  return true;
};

const part1 = pairs => {
  let count = 0;
  for (let i = 0; i < pairs.length; i++) {
    const [first, second] = splitOnLineBreak(pairs[i]);
    const array1 = eval(first);
    const array2 = eval(second);

    if (isRightOrder(array1, array2)) {
      count += i + 1;
    }
  }

  return count;
};

const part2 = pairs => {
  const packets = pairs.flatMap(pair => splitOnLineBreak(pair).map(p => eval(p)));
  const divider1 = [[2]];
  const divider2 = [[6]];
  packets.push(divider1);
  packets.push(divider2);

  packets.sort((a, b) => -isRightOrder(a, b));
  const index1 = packets.indexOf(divider1) + 1;
  const index2 = packets.indexOf(divider2) + 1;
  return index1 * index2;
};

export const day13 = async () => {
  const input = await getInput(__filename);
  const pairs = splitOnEmptyLine(input);

  printHeader(__filename, 1);
  console.log(part1(pairs));
  printHeader(__filename, 2);
  console.log(part2(pairs));
};
