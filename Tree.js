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

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let current = this.root;

    while (current) {
      if (value === current.data) return;

      if (value < current.data) {
        if (!current.left) {
          current.left = new Node(value);
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new Node(value);
          return;
        }
        current = current.right;
      }
    }
  }

  deleteItem(value) {
    const removeNode = (node, target) => {
      if (!node) return null;

      if (target < node.data) {
        node.left = removeNode(node.left, target);
        return node;
      }

      if (target > node.data) {
        node.right = removeNode(node.right, target);
        return node;
      }

      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let successor = node.right;
      while (successor.left) successor = successor.left;

      node.data = successor.data;
      node.right = removeNode(node.right, successor.data);
      return node;
    };

    this.root = removeNode(this.root, value);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    if (!this.root) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    const traverse = (node) => {
      if (!node) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };

    traverse(this.root);
  }

  height(value) {
    const findNode = (node, target) => {
      if (!node) return null;
      if (target === node.data) return node;
      if (target < node.data) return findNode(node.left, target);
      return findNode(node.right, target);
    };

    const getHeight = (node) => {
      if (!node) return -1;
      return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    };

    const targetNode = findNode(this.root, value);
    if (!targetNode) return undefined;

    return getHeight(targetNode);
  }

  depth(value) {
    let current = this.root;
    let currentDepth = 0;

    while (current) {
      if (value === current.data) return currentDepth;

      current = value < current.data ? current.left : current.right;
      currentDepth += 1;
    }

    return undefined;
  }

  isBalanced() {

  }

  rebalance() {

  }
}
