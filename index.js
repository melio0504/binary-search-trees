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

const initialValues = randomArray();
const tree = new Tree(initialValues);

console.log('Initial random values:', initialValues.join(', '));
console.log('Tree is balanced:', tree.isBalanced());
console.log('\nInitial tree:');
prettyPrint(tree.root);

console.log('\nTraversals (balanced tree):');
printTraversal(tree, 'Level order', tree.levelOrderForEach);
printTraversal(tree, 'Pre order', tree.preOrderForEach);
printTraversal(tree, 'Post order', tree.postOrderForEach);
printTraversal(tree, 'In order', tree.inOrderForEach);

const unbalancingValues = [101, 150, 200, 250, 300, 350, 400];
unbalancingValues.forEach((value) => tree.insert(value));

console.log('\nAdded values > 100:', unbalancingValues.join(', '));
console.log('Tree is balanced:', tree.isBalanced());
console.log('\nUnbalanced tree:');
prettyPrint(tree.root);

tree.rebalance();

console.log('\nTree was rebalanced.');
console.log('Tree is balanced:', tree.isBalanced());
console.log('\nRebalanced tree:');
prettyPrint(tree.root);

console.log('\nTraversals (rebalanced tree):');
printTraversal(tree, 'Level order', tree.levelOrderForEach);
printTraversal(tree, 'Pre order', tree.preOrderForEach);
printTraversal(tree, 'Post order', tree.postOrderForEach);
printTraversal(tree, 'In order', tree.inOrderForEach);
