import { getInput, splitOnLineBreak, printHeader } from './util';

const getCurrentDir = dirStack => dirStack[dirStack.length - 1];

const createStructure = terminalOutput => {
  const firstLine = terminalOutput[0].split(' ');
  const root = { name: firstLine[2], subDirectories: [], files: [] };

  const dirStack = [root];

  for (let i = 1; i < terminalOutput.length; i++) {
    const split = terminalOutput[i].split(' ');

    if (split[0] === '$' && split[1] === 'ls') continue;
    if (split[0] === '$' && split[1] === 'cd') {
      if (split[2] === '..') {
        dirStack.pop();
      } else {
        dirStack.push(getCurrentDir(dirStack).subDirectories.find(x => x.name === split[2]));
      }
    } else if (split[0] === 'dir') {
      getCurrentDir(dirStack).subDirectories.push({ name: split[1], subDirectories: [], files: [] });
    } else {
      getCurrentDir(dirStack).files.push({ name: split[1], size: split[0] });
    }
  }

  return root;
};

const setDirSizes = directory => {
  let size = directory.files.reduce((sum, file) => +file.size + sum, 0);

  for (let i = 0; i < directory.subDirectories.length; i++) {
    size += setDirSizes(directory.subDirectories[i]);
  }

  // eslint-disable-next-line no-param-reassign
  directory.size = size;
  return size;
};

const getFolderSum = directory => {
  let sum = 0;

  if (directory.size <= 100000) {
    sum += directory.size;
  }

  for (let i = 0; i < directory.subDirectories.length; i++) {
    sum += getFolderSum(directory.subDirectories[i]);
  }

  return sum;
};

const getSmallestToDelete = (directory, toDelete, candidates = []) => {
  if (directory.size >= toDelete) {
    candidates.push(directory.size);
  }

  for (let i = 0; i < directory.subDirectories.length; i++) {
    getSmallestToDelete(directory.subDirectories[i], toDelete, candidates);
  }

  return Math.min(...candidates);
};

const part1 = terminalOutput => {
  const root = createStructure(terminalOutput);
  setDirSizes(root);
  return getFolderSum(root);
};

const part2 = terminalOutput => {
  const root = createStructure(terminalOutput);
  setDirSizes(root);

  const unusedSpace = 70000000 - root.size;
  const toDelete = 30000000 - unusedSpace;

  return getSmallestToDelete(root, toDelete);
};

export const day7 = async () => {
  const input = await getInput(__filename);
  const terminalOutput = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(terminalOutput));
  printHeader(__filename, 2);
  console.log(part2(terminalOutput));
};
