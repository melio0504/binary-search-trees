import Node from './Node.js';

export default class Tree {
  constructor(arr = []) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedUnique = [...new Set(arr)].sort((a, b) => a - b);

    const build = (start, end) => {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new Node(sortedUnique[mid]);
      node.left = build(start, mid - 1);
      node.right = build(mid + 1, end);
      return node;
    };

    return build(0, sortedUnique.length - 1);
  }

  includes(value) {
    let current = this.root;

    while (current) {
      if (value === current.data) return true;
      current = value < current.data ? current.left : current.right;
    }

    return false;
  }

  insert() {

  }

  deleteItem(value) {

  }

  levelOrderForEach(callback) {

  }

  inOrderForEach(callback) {

  }

  preOrderForEach(callback) {

  }

  postOrderForEach(callback) {

  }

  height(value) {

  }

  depth(value) {

  }

  isBalanced() {

  }

  rebalance() {

  }
}
