import Tree from './Tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

const randomArray = (length = 15, maxExclusive = 100) => (
  Array.from({ length }, () => Math.floor(Math.random() * maxExclusive))
);

const printTraversal = (tree, label, traversalMethod) => {
  const values = [];
  traversalMethod.call(tree, (value) => values.push(value));
  console.log(`${label}:`, values.join(', '));
};

